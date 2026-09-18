const CACHE="rds-central-pro-disabled-v4";
self.addEventListener("install",e=>e.waitUntil(self.skipWaiting()));
self.addEventListener("activate",e=>e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.map(k=>caches.delete(k)));
  await self.registration.unregister();
  const clients=await self.clients.matchAll({type:"window"});
  clients.forEach(client=>client.navigate(client.url));
})()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request));
});