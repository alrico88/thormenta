export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "Thormenta",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0f172a" },
      ],
      htmlAttrs: {
        "data-bs-theme": "dark",
      },
    },
  },
  css: ["@/assets/main.scss"],
  modules: [
    "nuxt-icon",
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    "@vite-pwa/nuxt",
    "nuxt3-leaflet",
    "@nuxtjs/google-fonts",
  ],
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Thormenta",
      description:
        "Web app to calculate the distance to a storm based on lightning-thunder delay",
      theme_color: "#0f172a",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      cleanupOutdatedCaches: true,
    },
  },
  googleFonts: {
    families: {
      "Source+Sans+Pro": [400, 600, 700],
    },
  },
});
