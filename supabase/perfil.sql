-- Fotos de perfil y descripción. Pégalo entero en Supabase > SQL Editor > New query > Run. Se puede ejecutar más de una vez.
alter table public.profiles add column if not exists bio text check (char_length(bio) <= 160);
alter table public.profiles add column if not exists avatar text check (char_length(avatar) <= 60000);
