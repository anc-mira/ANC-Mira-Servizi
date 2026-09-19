// ANC Mira - Service Worker solo per notifiche push.
// Nessuna cache e nessun listener fetch.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('push', event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (_) {
    data = {
      body: event.data ? event.data.text() : ''
    };
  }

  const title = data.title || 'ANC Mira Servizi';

  const options = {
    body: data.body || 'È disponibile un nuovo aggiornamento.',
    icon: './logo-anc-mira.png',
    badge: './logo-anc-mira.png',
    data: {
      url: data.url || './'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const target = new URL(
    event.notification.data?.url || './',
    self.location.origin
  ).href;

  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });

    for (const client of windows) {
      if (client.url.startsWith(self.location.origin)) {
        await client.focus();

        if ('navigate' in client) {
          await client.navigate(target);
        }

        return;
      }
    }

    await self.clients.openWindow(target);
  })());
});
