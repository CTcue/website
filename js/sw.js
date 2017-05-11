"use strict";

var CACHE_NAME = 'ctcue-cache-v1';

var URLS = [
  "/",
  "/css/ctcue-main.min.css",
  "/js/jquery-2.1.4.min.js",
  "/js/jquery.validate.min.js",
  "/js/retina.min.js",
  "/js/modal.min.js",
  "/js/ctcue.js"
];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
              return cache.addAll(URLS);
          })
    );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
          // Cache hit - return response
          if (response) {
              return response;
          }

          return fetch(event.request);
      }
    )
  );
});