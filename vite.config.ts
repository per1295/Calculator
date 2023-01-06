import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "Calculator",
        short_name: "Calculator",
        description: "Calculator application",
        orientation: "any",
        theme_color: "#2196f3",
        background_color: "#2196f3",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/calculator-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
  build: {
    target: "esnext"
  }
})
