// Configuración pública de Supabase. Estos dos valores están pensados para ir en el navegador:
// la seguridad la dan las reglas RLS de supabase/schema.sql, no el secreto de la clave.
// Nunca pongas aquí la clave "service_role".
window.CF_CONFIG = {
  SUPABASE_URL: "",       // Ej.: https://abcdefgh.supabase.co
  SUPABASE_ANON_KEY: "",  // Clave "anon public" de Project Settings > API
  GOOGLE: false           // Pon true si activas el login con Google en Supabase
};
