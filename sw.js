/* Service worker: la app abre rápido y sin conexión con lo ya visto.
   Los datos (Supabase) y las páginas siempre van a la red primero. */
var V='cf-v4',SHELL=['./','index.html','tecnica.js','tecnica-var.js','asistente.js','config.js','icon-192.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V;}).map(function(n){return caches.delete(n);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return; // Supabase, fuentes y CDN: directo a la red
  e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp);});return res;}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('index.html');});}));
});
