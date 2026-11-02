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
