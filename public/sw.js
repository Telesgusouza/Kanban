if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let t={};const r=e=>s(e,n),d={module:{uri:n},exports:t,require:r};a[n]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/JMHzgZg5_JiyqQptHPjJa/_buildManifest.js",revision:"0c02512ab262bfc75c57cc22705c0fc7"},{url:"/_next/static/JMHzgZg5_JiyqQptHPjJa/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/229.01c00451287dd00d.js",revision:"01c00451287dd00d"},{url:"/_next/static/chunks/6c44d60f.291a69bd18fdaf95.js",revision:"291a69bd18fdaf95"},{url:"/_next/static/chunks/7112840a-64f7ff2b26566d90.js",revision:"64f7ff2b26566d90"},{url:"/_next/static/chunks/759-8e814e1dc637fc34.js",revision:"8e814e1dc637fc34"},{url:"/_next/static/chunks/cccc6244-10a8a1443675384d.js",revision:"10a8a1443675384d"},{url:"/_next/static/chunks/framework-305cb810cde7afac.js",revision:"305cb810cde7afac"},{url:"/_next/static/chunks/main-335933533b50f3ff.js",revision:"335933533b50f3ff"},{url:"/_next/static/chunks/pages/_app-4a0f05ba8be01bcc.js",revision:"4a0f05ba8be01bcc"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/dashboard-3471e6c151ca9e3c.js",revision:"3471e6c151ca9e3c"},{url:"/_next/static/chunks/pages/index-9877c5575de749a7.js",revision:"9877c5575de749a7"},{url:"/_next/static/chunks/pages/report-5fe4d8c067673259.js",revision:"5fe4d8c067673259"},{url:"/_next/static/chunks/pages/settings-96bb3b2b4b2a0b10.js",revision:"96bb3b2b4b2a0b10"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-249d7090bcd76ad2.js",revision:"249d7090bcd76ad2"},{url:"/_next/static/css/1f2e16e42c27ee17.css",revision:"1f2e16e42c27ee17"},{url:"/_next/static/css/34ebd6dd379a59ca.css",revision:"34ebd6dd379a59ca"},{url:"/_next/static/css/380840a419add119.css",revision:"380840a419add119"},{url:"/_next/static/css/d9ae7bb318ef6ae3.css",revision:"d9ae7bb318ef6ae3"},{url:"/_next/static/css/e17c8ba6350a07d8.css",revision:"e17c8ba6350a07d8"},{url:"/_next/static/media/bgLogin.14b8eb89.png",revision:"f42ac05f6d471b327007cef3b6b49b59"},{url:"/_next/static/media/camera.081a05dd.svg",revision:"3fa4ba026104084347cd545cb1178c21"},{url:"/_next/static/media/camera.1e05201a.svg",revision:"83e833b1def3e22a60aea11ed45abd61"},{url:"/_next/static/media/cog.e8e1a197.svg",revision:"0278f153483e11abea64f87da212ff4e"},{url:"/_next/static/media/doucment-text.b8d52788.svg",revision:"9ba6dc1c9d90f095cda3714cb3206082"},{url:"/_next/static/media/edit.1d25e6fb.png",revision:"c6ac8ce90092c43577a5d447d1e190a1"},{url:"/_next/static/media/eye-off.90c3f3ba.png",revision:"c704f6f86ce33f265768d156110616ad"},{url:"/_next/static/media/eye.18e6f7bf.png",revision:"0209dc5eafd44a9cc4f7474d02883ca8"},{url:"/_next/static/media/filter.5c506897.png",revision:"5ddb3fe398229aa202a63df75f6056b3"},{url:"/_next/static/media/logo-2.5803365d.png",revision:"aa6da163ee63b2eed6c4a212a5c5a251"},{url:"/_next/static/media/logo.844f88ba.png",revision:"2b0edfb7461246991f50be500b5ae4d9"},{url:"/_next/static/media/noUser.2d0923c5.png",revision:"f5ef4263a9c36adac59559031d67a0b7"},{url:"/_next/static/media/plus.338d8bf8.svg",revision:"4744052d98aa13c75756c33a34e485f8"},{url:"/_next/static/media/search.9abdc143.png",revision:"800a75102ec6dd342a04d66f456f49b9"},{url:"/_next/static/media/tablet-portrait.825e8d32.png",revision:"b75bda812aaf3b4fde96ea815655beeb"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icons/camera.svg",revision:"83e833b1def3e22a60aea11ed45abd61"},{url:"/icons/cog.svg",revision:"0278f153483e11abea64f87da212ff4e"},{url:"/icons/doucment-text.svg",revision:"9ba6dc1c9d90f095cda3714cb3206082"},{url:"/icons/filter.png",revision:"5ddb3fe398229aa202a63df75f6056b3"},{url:"/icons/icon-192.png",revision:"9d24e050a2fa968402a123b646724137"},{url:"/icons/icon-384.png",revision:"2947fe9e2728d67fc4db9bfe8b426f19"},{url:"/icons/icon-512.png",revision:"e2ce684866f23f75dda9afab77f88aae"},{url:"/icons/plus.svg",revision:"4744052d98aa13c75756c33a34e485f8"},{url:"/icons/search.png",revision:"800a75102ec6dd342a04d66f456f49b9"},{url:"/images/bgLogin.png",revision:"f42ac05f6d471b327007cef3b6b49b59"},{url:"/images/camera.svg",revision:"3fa4ba026104084347cd545cb1178c21"},{url:"/images/cog.png",revision:"be82004d7ab1b3fc0bec58e2f622f19c"},{url:"/images/document-text.png",revision:"8d223261c519d47ae976a231c9e21c9d"},{url:"/images/edit.png",revision:"c6ac8ce90092c43577a5d447d1e190a1"},{url:"/images/eye-off.png",revision:"c704f6f86ce33f265768d156110616ad"},{url:"/images/eye.png",revision:"0209dc5eafd44a9cc4f7474d02883ca8"},{url:"/images/logo-2.png",revision:"aa6da163ee63b2eed6c4a212a5c5a251"},{url:"/images/logo.png",revision:"2b0edfb7461246991f50be500b5ae4d9"},{url:"/images/noUser.png",revision:"f5ef4263a9c36adac59559031d67a0b7"},{url:"/images/tablet-portrait.png",revision:"b75bda812aaf3b4fde96ea815655beeb"},{url:"/manifest.json",revision:"92aa7ec43a4f15a531734ea69e2b92b8"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
