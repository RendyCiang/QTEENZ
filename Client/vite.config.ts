import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["manifest.json"],
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,

            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: {
                maxEntries: 10,
                // 30 days in seconds
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      manifest: {
        name: "QTEENZ",
        short_name: "QTEENZ",
        description: "Quick Canteen Zero Waiting Time",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "../../public/PWA/icons-1.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "../../public/PWA/icons-2.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
