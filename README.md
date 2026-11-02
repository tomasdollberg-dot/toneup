# Tone Up

App de gimnasio propia, gratuita y sin dependencias de compilación: un solo `index.html`, un `config.js` y un esquema de base de datos. Incluye rutina de seis sesiones, temporizador de descanso, metas editables, varios planes, generador de planes por objetivos con fuentes citadas y una parte social (amigos, actividad, kudos, comentarios y ranking semanal).

Sin servidor funciona igual, guardando todo en el navegador. Para tener cuentas y amigos hace falta Supabase.

## 1. Crear el proyecto en Supabase (gratis)

1. En [supabase.com](https://supabase.com) crea un proyecto nuevo.
2. Entra en **SQL Editor > New query**, pega el contenido de `supabase/schema.sql` y pulsa **Run**. Crea las tablas y las reglas de privacidad (RLS).
3. En **Authentication > Providers**, deja activado **Email**. Para que tus amigos entren sin confirmar el correo, desactiva **Confirm email** (opcional).
4. En **Authentication > URL Configuration**, pon como **Site URL** la dirección de tu web de GitHub Pages (paso 2) y añádela también a **Redirect URLs**.
5. En **Project Settings > API**, copia la **Project URL** y la clave **anon public**.

## 2. Publicar en GitHub Pages

1. Edita `config.js` y pega esos dos valores.
2. En GitHub: **Settings > Pages > Build and deployment > Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En un par de minutos la app estará en `https://TU_USUARIO.github.io/cuaderno-de-fuerza/`.

## 3. En el móvil

Abre la dirección en el navegador y usa **Compartir > Añadir a pantalla de inicio** (iPhone) o **Instalar app** (Android). Queda como una app más.

## Privacidad

- Las claves de `config.js` son públicas por diseño. Nunca pongas la clave `service_role`.
- Cada usuario solo lee y escribe sus propios datos. Las sesiones marcadas como compartidas las ven únicamente los amigos aceptados.
- Los kudos y los comentarios solo se pueden hacer sobre sesiones que ya puedes ver.
- Cualquier usuario registrado puede buscar nombres de usuario y nombres para mostrar. No se exponen correos.

## Llevar tus datos de la versión de Claude

En la versión de Claude, ve a **Progreso > Copia completa (JSON)** y guarda el archivo. En esta app, entra en **Amigos > Perfil > Importar copia**.

## Evidencia

El generador de planes usa reglas fijas. Cada regla indica su nivel de evidencia y enlaza a sus fuentes dentro de la pestaña **Plan**. Es un punto de partida, no consejo médico.

## Novedades
- Inicio con ejercicios por zona, figura animada y técnica para evitar lesiones.
- Asistente de rutina por objetivo, días y tiempo.
- Rutinas compartidas con amigos y "me gusta" (ejecuta supabase/rutinas.sql una vez).
