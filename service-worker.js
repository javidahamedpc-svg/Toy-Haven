const CACHE_NAME = "toy-haven-v4";

const filesToCache = [
    "./",
    "./index.html",
    "./products.html",
    "./cart.html",
    "./checkout.html",
    "./wishlist.html",
    "./feedback.html",

    "./css/style.css",

    "./js/main.js",
    "./js/products.js",
    "./js/cart.js",
    "./js/checkout.js",
    "./js/wishlist.js",
    "./js/feedback.js",

    "./favicon.png",

    "./images/hero-figurines.jpg",
    "./images/hero-toys.jpg",
    "./images/hero-boardgames.jpg",
    "./images/hero-cars.jpg"
];

self.addEventListener("install", function(event) {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );

});


self.addEventListener("activate", function(event) {

    event.waitUntil(
        caches.keys().then(function(cacheNames) {

            return Promise.all(
                cacheNames.map(function(cacheName) {

                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }

                })
            );

        })
    );

    self.clients.claim();
});


self.addEventListener("fetch", function(event) {

    event.respondWith(

        fetch(event.request)
            .then(function(response) {

                return response;

            })
            .catch(function() {

                return caches.match(event.request);

            })

    );

});