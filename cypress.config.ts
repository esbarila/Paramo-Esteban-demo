import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1080,
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