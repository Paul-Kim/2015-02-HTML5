(function(global){
  'use strict';
  //toolbox 추가
  importScripts('../node_modules/sw-toolbox/sw-toolbox.js');

  global.toolbox.options.debug = true;
  //global.toolbox.router.default = global.toolbox.networkFirst;
  toolbox.precache(['/index.html']);

  toolbox.router.get('/asset/', global.toolbox.cacheFirst, {
    cache:{
      name: 'asset',
      maxEntries:5,
      maxAgeSeconds: 60 * 60 * 24
    },
    networkTimeoutSeconds: 1
  });

  toolbox.router.get('http://128.199.76.9:8002/', global.toolbox.networkFirst, {
    cache:{
      name: 'api',
      maxEntries:5,
      maxAgeSeconds: 60 * 60 * 24
    },
    origin: /http:\/\/128\.199\.76\.9:8002/,
    networkTimeoutSeconds: 1
  });

  toolbox.router.post('http://128.199.76.9:8002/', global.toolbox.networkFirst, {
    cache:{
      name: 'api',
      maxEntries:5,
      maxAgeSeconds: 60 * 60 * 24
    },
    origin: /http:\/\/128\.199\.76\.9:8002/,
    networkTimeoutSeconds: 1
  });

  //Ensure that our service worker takes control of the page as soon as possible
  global.addEventListener('install', function(event){
    event.waitUntil(global.skipWaiting());
  });

  global.addEventListener('activate', function(event){
    event.waitUntil(global.clients.claim());
  });

})(self);
