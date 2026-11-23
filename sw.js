const C='diary-v2',A=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET')return;
const put=r=>{if(r&&(r.ok||r.type=='opaque')){const c=r.clone();caches.open(C).then(x=>x.put(q,c))}return r};
if(q.mode=='navigate'){e.respondWith(fetch(q).then(put).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(q).then(r=>r||fetch(q).then(put)))});
