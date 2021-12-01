const CACHE ='cache-1';
const CACHE_DINAMICO ='dinamico-1';

self.addEventListener('install', evento=>{
    const promesa =caches.open(CACHE)
        .then(cache=>{
            return cache.addAll([
                'index.html',
                'offline.html',
                'css/styles.css',
                'js/app.js',
                'js/scripts.js',
                'sw.js',
                'manifest.json',
                'assets/img/no-img.jpeg'
            ]);
        });   
        evento.waitUntil(Promise.all([promesa]));
});

self.addEventListener('activate', evento =>{
    const respuesta=caches.keys().then(keys =>{
        keys.forEach(key =>{
            if(key !== CACHE && key.includes('cache')){
                return caches.delete(key);
            }
        });
    });
    evento.waitUntil(respuesta);
});

self.addEventListener('fetch', evento =>{
    const respuesta=caches.match(evento.request)
        .then(res=>{
            if (res) return res;
            console.log('No existe', evento.request.url);
            return fetch(evento.request)
                .then(resWeb=>{
                    caches.open(CACHE_DINAMICO)
                        .then(cache=>{
                            cache.put(evento.request,resWeb);
                            limpiarCache(CACHE_DINAMICO,100);
                        })
                    return resWeb.clone();  
                });
        })
        .catch(err => {
            if(evento.request.headers.get('accept').includes('text/html')){
                return caches.match('offline.html');
            }else {
                return caches.match('assets/img/no-img.jpeg');
            }
        });
        evento.respondWith(respuesta);
        

});
function limpiarCache(nombreCache, numeroItems){
    caches.open(nombreCache)
        .then(cache=>{
            return cache.keys()
                .then(keys=>{
                    if (keys.length>numeroItems){
                        cache.delete(keys[0])
                            .then(limpiarCache(nombreCache, numeroItems));
                    }
                });
        });
}
