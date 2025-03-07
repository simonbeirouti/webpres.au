import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  prerender: [
    "/",
    "/about",
    "/services",
    "/contact",
  ],
} satisfies Config;
