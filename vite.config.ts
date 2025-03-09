import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import VitePluginSitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      tailwindcss(), 
      reactRouter(), 
      tsconfigPaths(),
      VitePluginSitemap({
        hostname: 'https://webpres.au',
        exclude: ['/api/*', '/sitemap.xml'],
        outDir: 'build/client',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date()
      })
    ],
    define: {
      'process.env': env
    },
  }
});
