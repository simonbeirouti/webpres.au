import { type RouteConfig, index, prefix, layout, route } from "@react-router/dev/routes";

export const navRoutes = [
    route("about", "./routes/about.tsx"),
    route("services", "./routes/services.tsx"),
    route("contact", "./routes/contact.tsx"),
];

const apiRoutes = [
    route("resend", "./routes/api/resend.tsx"),
];

export default [
    layout("./components/layout/main-layout.tsx", [
        index("routes/home.tsx"),
        ...navRoutes,
    ]),
    ...prefix("api", apiRoutes),
] satisfies RouteConfig;