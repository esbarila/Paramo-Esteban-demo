import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1024,
  viewportHeight: 768,
  e2e: {
    baseUrl: "https://demo.casino/",
    setupNodeEvents(on, config) {
      on('task', {        
        setUserData: (userData) => {
          (global as any).userData = userData;
          return null;
        },
        getUserData: () => {
          return (global as any).userData;
        },
      })
    },
  },
});