export async function registerServiceWorker() {
    const reg = await navigator.serviceWorker.register(
      new URL('../../service-worker.ts', import.meta.url),
      {
        type: 'module',
      }
    );
  
    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;
  
    reg.addEventListener('updatefound', () => {
      // A wild service worker has appeared in reg.installing!
      const newWorker = reg.installing;
  
      if (newWorker) {
        newWorker.state;
        // "installing" - the install event has fired, but not yet complete
        // "installed"  - install complete
        // "activating" - the activate event has fired, but not yet complete
        // "activated"  - fully active
        // "redundant"  - discarded. Either failed install, or it's been
        //                replaced by a newer version
  
        newWorker.addEventListener('statechange', () => {
          // newWorker.state has changed
        });
      }
    });
  
    navigator.serviceWorker.addEventListener('controllerchange', (e) => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.
      console.debug('ServiceWorker has been activated', e);
    });
  
    navigator.serviceWorker.addEventListener('message', () => {
      console.debug('New message');
    });
  
    navigator.serviceWorker.addEventListener('messageerror', () => {
      console.debug('New message error');
    });
  
    window.addEventListener('beforeinstallprompt', () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.
      console.debug('About to be installed');
    });
  
    window.addEventListener('appinstalled', () => {
      // This fires when the app has been installed
      console.debug('App installed');
    });
  }
  