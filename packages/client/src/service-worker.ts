interface ExtEvent extends Event {
  waitUntil(fn: Promise<void>): void
}

interface Fetch extends Event {
  request: RequestInfo | URL
  respondWith(response: Promise<Response> | Response): void
}

const cacheName = 'chess-tank-PWA-v1.0'

// Кешируемые ресурсы по умолчанию
const INITIAL_CACHED_RESOURCES = ['/']

self.addEventListener('install', (event: ExtEvent) => {
  /* eslint no-console: 0 */
  console.log('[Service Worker] Install')

  event.waitUntil(
    (async () => {
      self.skipWaiting()
      const cache = await caches.open(cacheName)
      await cache.addAll(INITIAL_CACHED_RESOURCES)
      console.log('[Service Worker] Caching all: app shell and content')
    })(),
  )
})

self.addEventListener('activate', function (event: ExtEvent) {
  /* eslint no-console: 0 */
  console.log('Service Worker activating.')
  event.waitUntil(
    (async () => {
      // позволяет SW начать перехватывать запросы
      self.clients.claim()

      // Если имя кеша поменялось, удаляем старый кеш
      const cacheNames = await caches.keys()

      await Promise.all(cacheNames.filter(name => name !== cacheName).map(cache => caches.delete(cache)))
    })(),
  )
})

self.addEventListener('fetch', (e: Fetch) => {
  e.respondWith(
    (async () => {
      try {
        const response = await fetch(e.request)
        const cache = await caches.open(cacheName)
        cache.put(e.request, response.clone())
        return response
      } catch (error: unknown) {
        const response = await caches.match(e.request)
        if (response) {
          return response
        } else {
          return Promise.reject()
        }
      }
    })(),
  )
})

export {}
