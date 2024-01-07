import router from '../router'

const registerServiceWorker = async () => {
  const pageReload = () => {
    router.navigate(0)
  }
  if ('serviceWorker' in navigator) {
    try {
      const register = await navigator.serviceWorker.register('/serviceWorker.js', {
        scope: '/',
      })
      if (register.installing) {
        const sw = register.installing || register.waiting
        sw.onstatechange = function () {
          if (sw.state === 'installed') {
            // SW installed.  Refresh page so SW can respond with SW-enabled page.
            pageReload()
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* eslint no-console: 0 */
        console.error(`Registration failed with ${error.name}`)
      }
    }
  }
}

export default registerServiceWorker
