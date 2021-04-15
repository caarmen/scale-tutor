//https://web.dev/offline-fallback-page/
/*
Copyright 2015, 2019, 2020, 2021 Google LLC. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const OFFLINE_VERSION = 10003;

const CACHE_NAME = 'offline';

const contentToCache = [
  "/index.html",
  "/libs/material-icons.css",
  "/libs/material-components-web-10.0.0.min.js",
  "/libs/material-components-web-10.0.0.min.css.map",
  "/libs/material-components-web-10.0.0.min.css",
  "/libs/material-icons.ttf",
  "/src/css/theme.css",
  "/src/css/main.css",
  "/src/js/viewmodel/CheckboxGroup.js",
  "/src/js/viewmodel/CheckboxItem.js",
  "/src/js/viewmodel/ObservableField.js",
  "/src/js/viewmodel/ScaleName.js",
  "/src/js/viewmodel/RadioItem.js",
  "/src/js/viewmodel/RadioGroup.js",
  "/src/js/viewmodel/StateMachine.js",
  "/src/js/viewmodel/NoteName.js",
  "/src/js/viewmodel/MainViewModel.js",
  "/src/js/Log.js",
  "/src/js/model/ScalePlayer.js",
  "/src/js/model/SettingsAccess.js",
  "/src/js/model/MainModel.js",
  "/src/js/model/SpeechEngine.js",
  "/src/js/model/ScaleGenerator.js",
  "/src/js/model/Settings.js",
  "/src/js/view/CheckboxSettingView.js",
  "/src/js/view/ControlsView.js",
  "/src/js/view/MainView.js",
  "/src/js/view/MainView.js",
  "/src/js/view/RadioSettingView.js",
  "/src/js/view/ScaleView.js",
  "/src/js/view/SettingsView.js",
  "/src/js/Scale.js",
  "/src/js/Note.js",
  "/src/js/i18n/strings_en.js",
  "/src/js/i18n/I18n.js",
  "/src/js/ArrayExt.js",
  "/src/resources/as_major_alto.svg",
  "/src/resources/b_natural_minor_treble.svg",
  "/src/resources/ds_natural_minor_treble.svg",
  "/src/resources/g_major_treble.svg",
  "/src/resources/b_natural_minor_alto.svg",
  "/src/resources/f_melodic_minor_bass.svg",
  "/src/resources/f_natural_minor_treble.svg",
  "/src/resources/d_major_bass.svg",
  "/src/resources/a_harmonic_minor_treble.svg",
  "/src/resources/b_harmonic_minor_alto.svg",
  "/src/resources/as_melodic_minor_alto.svg",
  "/src/resources/e_natural_minor_alto.svg",
  "/src/resources/a_melodic_minor_bass.svg",
  "/src/resources/c_harmonic_minor_bass.svg",
  "/src/resources/c_major_bass.svg",
  "/src/resources/ds_natural_minor_alto.svg",
  "/src/resources/f_natural_minor_alto.svg",
  "/src/resources/d_melodic_minor_treble.svg",
  "/src/resources/as_harmonic_minor_bass.svg",
  "/src/resources/b_major_bass.svg",
  "/src/resources/f_harmonic_minor_treble.svg",
  "/src/resources/b_melodic_minor_bass.svg",
  "/src/resources/fs_harmonic_minor_alto.svg",
  "/src/resources/a_natural_minor_alto.svg",
  "/src/resources/ds_melodic_minor_bass.svg",
  "/src/resources/e_major_bass.svg",
  "/src/resources/g_harmonic_minor_bass.svg",
  "/src/resources/cs_natural_minor_treble.svg",
  "/src/resources/fs_major_alto.svg",
  "/src/resources/gs_harmonic_minor_treble.svg",
  "/src/resources/e_melodic_minor_bass.svg",
  "/src/resources/c_major_treble.svg",
  "/src/resources/as_natural_minor_bass.svg",
  "/src/resources/f_harmonic_minor_alto.svg",
  "/src/resources/g_major_bass.svg",
  "/src/resources/d_melodic_minor_bass.svg",
  "/src/resources/gs_harmonic_minor_alto.svg",
  "/src/resources/d_harmonic_minor_bass.svg",
  "/src/resources/ds_major_bass.svg",
  "/src/resources/fs_natural_minor_treble.svg",
  "/src/resources/ds_harmonic_minor_bass.svg",
  "/src/resources/a_melodic_minor_treble.svg",
  "/src/resources/gs_melodic_minor_bass.svg",
  "/src/resources/cs_natural_minor_alto.svg",
  "/src/resources/f_major_treble.svg",
  "/src/resources/cs_harmonic_minor_alto.svg",
  "/src/resources/gs_melodic_minor_treble.svg",
  "/src/resources/e_harmonic_minor_alto.svg",
  "/src/resources/e_melodic_minor_treble.svg",
  "/src/resources/fs_melodic_minor_alto.svg",
  "/src/resources/c_melodic_minor_bass.svg",
  "/src/resources/c_harmonic_minor_treble.svg",
  "/src/resources/fs_harmonic_minor_treble.svg",
  "/src/resources/g_natural_minor_alto.svg",
  "/src/resources/gs_major_alto.svg",
  "/src/resources/g_natural_minor_treble.svg",
  "/src/resources/fs_natural_minor_bass.svg",
  "/src/resources/as_harmonic_minor_treble.svg",
  "/src/resources/a_harmonic_minor_alto.svg",
  "/src/resources/d_harmonic_minor_treble.svg",
  "/src/resources/a_major_bass.svg",
  "/src/resources/d_natural_minor_alto.svg",
  "/src/resources/c_natural_minor_treble.svg",
  "/src/resources/gs_natural_minor_alto.svg",
  "/src/resources/cs_melodic_minor_bass.svg",
  "/src/resources/b_major_treble.svg",
  "/src/resources/g_melodic_minor_bass.svg",
  "/src/resources/as_natural_minor_treble.svg",
  "/src/resources/c_natural_minor_alto.svg",
  "/src/resources/f_major_bass.svg",
  "/src/resources/cs_major_bass.svg",
  "/src/resources/g_harmonic_minor_alto.svg",
  "/src/resources/e_major_alto.svg",
  "/src/resources/ds_melodic_minor_alto.svg",
  "/src/resources/a_natural_minor_bass.svg",
  "/src/resources/f_harmonic_minor_bass.svg",
  "/src/resources/as_natural_minor_alto.svg",
  "/src/resources/e_melodic_minor_alto.svg",
  "/src/resources/as_melodic_minor_treble.svg",
  "/src/resources/fs_major_bass.svg",
  "/src/resources/ds_harmonic_minor_treble.svg",
  "/src/resources/e_harmonic_minor_treble.svg",
  "/src/resources/b_major_alto.svg",
  "/src/resources/g_melodic_minor_treble.svg",
  "/src/resources/as_harmonic_minor_alto.svg",
  "/src/resources/f_natural_minor_bass.svg",
  "/src/resources/fs_harmonic_minor_bass.svg",
  "/src/resources/c_melodic_minor_treble.svg",
  "/src/resources/b_melodic_minor_alto.svg",
  "/src/resources/e_major_treble.svg",
  "/src/resources/gs_major_treble.svg",
  "/src/resources/a_major_treble.svg",
  "/src/resources/e_natural_minor_bass.svg",
  "/src/resources/as_melodic_minor_bass.svg",
  "/src/resources/b_harmonic_minor_bass.svg",
  "/src/resources/ds_natural_minor_bass.svg",
  "/src/resources/c_major_alto.svg",
  "/src/resources/cs_major_treble.svg",
  "/src/resources/c_harmonic_minor_alto.svg",
  "/src/resources/a_melodic_minor_alto.svg",
  "/src/resources/cs_harmonic_minor_treble.svg",
  "/src/resources/b_harmonic_minor_treble.svg",
  "/src/resources/b_natural_minor_bass.svg",
  "/src/resources/as_major_bass.svg",
  "/src/resources/fs_melodic_minor_treble.svg",
  "/src/resources/a_natural_minor_treble.svg",
  "/src/resources/d_major_alto.svg",
  "/src/resources/fs_major_treble.svg",
  "/src/resources/f_melodic_minor_alto.svg",
  "/src/resources/gs_natural_minor_treble.svg",
  "/src/resources/e_natural_minor_treble.svg",
  "/src/resources/g_melodic_minor_alto.svg",
  "/src/resources/cs_melodic_minor_treble.svg",
  "/src/resources/cs_major_alto.svg",
  "/src/resources/f_major_alto.svg",
  "/src/resources/c_natural_minor_bass.svg",
  "/src/resources/d_natural_minor_treble.svg",
  "/src/resources/a_harmonic_minor_bass.svg",
  "/src/resources/fs_natural_minor_alto.svg",
  "/src/resources/g_harmonic_minor_treble.svg",
  "/src/resources/d_major_treble.svg",
  "/src/resources/cs_melodic_minor_alto.svg",
  "/src/resources/gs_natural_minor_bass.svg",
  "/src/resources/d_natural_minor_bass.svg",
  "/src/resources/a_major_alto.svg",
  "/src/resources/c_melodic_minor_alto.svg",
  "/src/resources/as_major_treble.svg",
  "/src/resources/gs_major_bass.svg",
  "/src/resources/g_natural_minor_bass.svg",
  "/src/resources/cs_natural_minor_bass.svg",
  "/src/resources/gs_melodic_minor_alto.svg",
  "/src/resources/ds_harmonic_minor_alto.svg",
  "/src/resources/d_harmonic_minor_alto.svg",
  "/src/resources/ds_major_alto.svg",
  "/src/resources/b_melodic_minor_treble.svg",
  "/src/resources/gs_harmonic_minor_bass.svg",
  "/src/resources/ds_melodic_minor_treble.svg",
  "/src/resources/g_major_alto.svg",
  "/src/resources/d_melodic_minor_alto.svg",
  "/src/resources/fs_melodic_minor_bass.svg",
  "/src/resources/ds_major_treble.svg",
  "/src/resources/e_harmonic_minor_bass.svg",
  "/src/resources/f_melodic_minor_treble.svg",
  "/src/resources/cs_harmonic_minor_bass.svg",
  "/src/templates/toggle.html",
  "/src/templates/about.html",
  "/src/templates/radio.html",
  "/src/templates/dialog.html",
  "/src/templates/checkbox.html",
  "/src/templates/setting.html",
  "/src/templates/settings.html",
]
self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Install');

  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.addAll(contentToCache)
  })());

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  console.log(`[ServiceWorker] Fetch ${event.request.url}`);
  // console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith((async () => {
    try {
      const preloadResponse = await event.preloadResponse;
      if (preloadResponse) {
        return preloadResponse;
      }

      const networkResponse = await fetch(event.request);
      return networkResponse;
    } catch (error) {
      console.log(`[Service Worker] Fetch of ${event.request.url} failed; returning offline page instead.`, error);

      const cache = await caches.open(CACHE_NAME);
      let path = new URL(event.request.url).pathname
      if (path == "/") path = "/index.html"
      console.log(`looking up ${path} in cache`)
      const cachedResponse = await cache.match(path)
      console.log(`cached response: ${cachedResponse}`)
      return cachedResponse;
    }
  })());
});
