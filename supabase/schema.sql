-- Cuaderno de Fuerza · esquema de Supabase
-- Pégalo entero en Supabase > SQL Editor > New query > Run. Se puede ejecutar más de una vez.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9_]{3,20}$'),
  display_name text check (char_length(display_name) <= 40),
  created_at timestamptz not null default now()
);

create table if not exists public.app_config (
  user_id uuid primary key references auth.users(id) on delete cascade,
  cfg jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.sessions (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  date timestamptz not null,
  data jsonb not null,
  shared boolean not null default true,
  primary key (user_id, id)
);
create index if not exists sessions_user_date on public.sessions (user_id, date desc);

create table if not exists public.friendships (
  requester uuid not null references public.profiles(id) on delete cascade,
  addressee uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted')),
  created_at timestamptz not null default now(),
  primary key (requester, addressee),
  check (requester <> addressee)
);

create table if not exists public.kudos (
  owner_id uuid not null,
  session_id text not null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (owner_id, session_id, user_id),
  foreign key (owner_id, session_id) references public.sessions(user_id, id) on delete cascade
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  session_id text not null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now(),
  foreign key (owner_id, session_id) references public.sessions(user_id, id) on delete cascade
);
create index if not exists comments_session on public.comments (owner_id, session_id, created_at);

-- Ayuda: ¿a y b son amigos aceptados? (security definer para no depender de las reglas de friendships)
create or replace function public.are_friends(a uuid, b uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from public.friendships f
    where f.status = 'accepted'
      and ((f.requester = a and f.addressee = b) or (f.requester = b and f.addressee = a))
  );
$$;
revoke all on function public.are_friends(uuid, uuid) from public;
grant execute on function public.are_friends(uuid, uuid) to authenticated;

alter table public.profiles    enable row level security;
alter table public.app_config  enable row level security;
alter table public.sessions    enable row level security;
alter table public.friendships enable row level security;
alter table public.kudos       enable row level security;
alter table public.comments    enable row level security;

drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
create policy profiles_select on public.profiles for select to authenticated using (true);
create policy profiles_insert on public.profiles for insert to authenticated with check (id = auth.uid());
create policy profiles_update on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists config_all on public.app_config;
create policy config_all on public.app_config for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists sessions_select on public.sessions;
drop policy if exists sessions_insert on public.sessions;
drop policy if exists sessions_update on public.sessions;
drop policy if exists sessions_delete on public.sessions;
create policy sessions_select on public.sessions for select to authenticated
  using (user_id = auth.uid() or (shared and public.are_friends(auth.uid(), user_id)));
create policy sessions_insert on public.sessions for insert to authenticated with check (user_id = auth.uid());
create policy sessions_update on public.sessions for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy sessions_delete on public.sessions for delete to authenticated using (user_id = auth.uid());

drop policy if exists friendships_select on public.friendships;
drop policy if exists friendships_insert on public.friendships;
drop policy if exists friendships_update on public.friendships;
drop policy if exists friendships_delete on public.friendships;
create policy friendships_select on public.friendships for select to authenticated
  using (requester = auth.uid() or addressee = auth.uid());
create policy friendships_insert on public.friendships for insert to authenticated
  with check (requester = auth.uid() and status = 'pending');
create policy friendships_update on public.friendships for update to authenticated
  using (addressee = auth.uid() and status = 'pending') with check (addressee = auth.uid() and status = 'accepted');
create policy friendships_delete on public.friendships for delete to authenticated
  using (requester = auth.uid() or addressee = auth.uid());

-- Solo se puede cambiar la columna status (así nadie reescribe quién es el solicitante)
revoke update on public.friendships from authenticated;
grant update (status) on public.friendships to authenticated;

-- Kudos y comentarios: solo sobre sesiones que el usuario puede ver (las reglas de sessions se aplican dentro del exists)
drop policy if exists kudos_select on public.kudos;
drop policy if exists kudos_insert on public.kudos;
drop policy if exists kudos_delete on public.kudos;
create policy kudos_select on public.kudos for select to authenticated
  using (exists (select 1 from public.sessions s where s.user_id = owner_id and s.id = session_id));
create policy kudos_insert on public.kudos for insert to authenticated
  with check (user_id = auth.uid() and exists (select 1 from public.sessions s where s.user_id = owner_id and s.id = session_id));
create policy kudos_delete on public.kudos for delete to authenticated using (user_id = auth.uid());

drop policy if exists comments_select on public.comments;
drop policy if exists comments_insert on public.comments;
drop policy if exists comments_delete on public.comments;
create policy comments_select on public.comments for select to authenticated
  using (exists (select 1 from public.sessions s where s.user_id = owner_id and s.id = session_id));
create policy comments_insert on public.comments for insert to authenticated
  with check (user_id = auth.uid() and exists (select 1 from public.sessions s where s.user_id = owner_id and s.id = session_id));
create policy comments_delete on public.comments for delete to authenticated
  using (user_id = auth.uid() or owner_id = auth.uid());
-- Rutinas compartidas con amigos y "me gusta". Ejecutar una vez en Supabase > SQL Editor.
create table if not exists public.shared_routines (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  note text check (note is null or char_length(note) <= 500),
  data jsonb not null,
  created_at timestamptz not null default now()
);
create table if not exists public.routine_likes (
  routine_id uuid not null references public.shared_routines(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (routine_id, user_id)
);
alter table public.shared_routines enable row level security;
alter table public.routine_likes   enable row level security;

drop policy if exists routines_select on public.shared_routines;
drop policy if exists routines_insert on public.shared_routines;
drop policy if exists routines_update on public.shared_routines;
drop policy if exists routines_delete on public.shared_routines;
create policy routines_select on public.shared_routines for select to authenticated
  using (owner = auth.uid() or public.are_friends(auth.uid(), owner));
create policy routines_insert on public.shared_routines for insert to authenticated with check (owner = auth.uid());
create policy routines_update on public.shared_routines for update to authenticated using (owner = auth.uid()) with check (owner = auth.uid());
create policy routines_delete on public.shared_routines for delete to authenticated using (owner = auth.uid());

drop policy if exists rlikes_select on public.routine_likes;
drop policy if exists rlikes_insert on public.routine_likes;
drop policy if exists rlikes_delete on public.routine_likes;
create policy rlikes_select on public.routine_likes for select to authenticated
  using (exists (select 1 from public.shared_routines r where r.id = routine_id and (r.owner = auth.uid() or public.are_friends(auth.uid(), r.owner))));
create policy rlikes_insert on public.routine_likes for insert to authenticated
  with check (user_id = auth.uid() and exists (select 1 from public.shared_routines r where r.id = routine_id and (r.owner = auth.uid() or public.are_friends(auth.uid(), r.owner))));
create policy rlikes_delete on public.routine_likes for delete to authenticated using (user_id = auth.uid());

create index if not exists shared_routines_owner_idx on public.shared_routines(owner, created_at desc);
