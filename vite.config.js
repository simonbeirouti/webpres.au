import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

const pages = [
  {
    path: "/about",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/contact",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/services",
    changeFrequency: "weekly",
    priority: 0.8,
  },
];

const services = ['ai', 'website', 'design', 'web3']

const routes = services.map(service => {
  return {
    path: `/services/${service}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }
})

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/send-email': {
        target: 'https://api.resend.com',
        changeOrigin: true,
        rewrite: (path) => '/emails',
        secure: true
      }
    }
  },
  plugins: [
    react(),
    Sitemap({
        hostname: 'https://webpres.au',
        sitemapPath: 'sitemap.xml',
        robotsPath: 'robots.txt',
        generateRobotsTxt: true,
        outDir: 'build',
        readable: true,
        dynamicRoutes: [...pages.map(page => page.path), ...routes.map(route => route.path)]
      }
    ),
  ],
  build: {
    outDir: "build",
  },
});
