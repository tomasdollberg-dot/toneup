// Configuración pública de Supabase. Estos dos valores están pensados para ir en el navegador:
// la seguridad la dan las reglas RLS de supabase/schema.sql, no el secreto de la clave.
// Nunca pongas aquí la clave "service_role".
window.CF_CONFIG = {
  SUPABASE_URL: "https://xlzpmroccxkgvohfrwvz.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_f2ZOVlSAfV_pJUnJ8YCaig_6djBKMtv", // Clave publicable (pública por diseño)
  GOOGLE: true            // Pon true si activas el login con Google en Supabase
};
