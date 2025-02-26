const CACHE_NAME = "bookverse-cache-v1"
const API_CACHE_NAME = "livres"
const urlsToCache = [
    "/",
    "/offline.html",
    "/manifest.json",
    "/search",
    "/search?query=",
    "/books",
    "/book/1"
    // Add other static assets here
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache)
        }),
    )
})


self.addEventListener("fetch", (event) => {
    
    if(event.request.url.includes('chrome-extension')){
        // renvoie le résultat de notre requete
        return fetch(event.request);
    }
    
    const url = new URL(event.request.url)
    console.log(url.pathname)
    
   /* if (url.pathname.startsWith("/search")) {
        event.respondWith(caches.open(CACHE_NAME).then((cache) => {
            cache.match('/search').then((result) => {
                cache.put(url.pathname, result.clone()).then(() => {
                    return cache.match(url.pathname)
                })
            })
        }))
    } else */if (url.pathname.startsWith("/api/livres")) {
        event.respondWith(staleWhileRevalidate(event.request, API_CACHE_NAME))
    } else if (urlsToCache.includes(url.pathname)) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                if (response) {
                    return response
                }
                return staleWhileRevalidate(event.request, CACHE_NAME)
            }),
        )
    }
    // Network-first for all other requests
    else {
        //console.count('localFirstReached')
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // If the network request is successful, clone the response
                    // Store one copy in the cache and return the other
                    const responseClone = response.clone()
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone)
                    })
                    return response
                })
                .catch(() => {
                    //console.count('cache localFirstReached')
                    // If the network request fails, try to get the resource from the cache
                    return caches.match(event.request)
                }),
        )
    }
})

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME]
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                }),
            )
        }),
    )
    event.waitUntil(self.clients.claim());
})

function staleWhileRevalidate(request, cacheName) {
    return caches.open(cacheName).then((cache) => {
        return cache.match(request).then((response) => {
            const fetchPromise = fetch(request).then((networkResponse) => {
                cache.put(request, networkResponse.clone())
                return networkResponse
            })
            return response || fetchPromise
        })
    })
}
