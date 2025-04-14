import {
    BookOpen,
    Bot,
    BadgeCheck,
    Bell,
    CreditCard,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    Sparkles,
    SquareTerminal,
    Users,
} from "lucide-react"

export const navRoutes = [
    { path: "about", href: "/about" },
    { path: "services", href: "/services" },
    { path: "pricing", href: "/pricing" },
    { path: "contact", href: "/contact" },
];

export const dashboardRoutes = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    userNav: [
        {
            title: "Activity",
            url: "/dashboard/activity",
            icon: BadgeCheck,
        },
        {
            title: "Settings",
            url: "/dashboard/settings", 
            icon: Settings2,
        },
        // {
        //     title: "Notifications",
        //     url: "/notifications",
        //     icon: Bell,
        // },
        // {
        //     title: "Upgrade",
        //     url: "/upgrade",
        //     icon: Sparkles,
        // }
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: SquareTerminal,
            isActive: true,
            // items: [
            //     // {
            //     //     title: "Activity",
            //     //     url: "/dashboard/activity",
            //     // },
            //     // {
            //     //     title: "Settings",
            //     //     url: "/dashboard/settings",
            //     // },
            // ],
        },
        {
            title: "Teams",
            url: "/dashboard/teams",
            icon: Bot,
            // items: [
            //     {
            //         title: "Genesis",
            //         url: "#",
            //     },
            //     {
            //         title: "Explorer",
            //         url: "#",
            //     },
            //     {
            //         title: "Quantum",
            //         url: "#",
            //     },
            // ],
        },
        // {
        //     title: "Documentation",
        //     url: "#",
        //     icon: BookOpen,
        //     items: [
        //         {
        //             title: "Introduction",
        //             url: "#",
        //         },
        //         {
        //             title: "Get Started",
        //             url: "#",
        //         },
        //         {
        //             title: "Tutorials",
        //             url: "#",
        //         },
        //         {
        //             title: "Changelog",
        //             url: "#",
        //         },
        //     ],
        // },
        // {
        //     title: "Settings",
        //     url: "#",
        //     icon: Settings2,
        //     items: [
        //         {
        //             title: "General",
        //             url: "#",
        //         },
        //         {
        //             title: "Team",
        //             url: "#",
        //         },
        //         {
        //             title: "Billing",
        //             url: "#",
        //         },
        //         {
        //             title: "Limits",
        //             url: "#",
        //         },
        //     ],
        // },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
    // projects: [
    //     {
    //         name: "Design Engineering",
    //         url: "#",
    //         icon: Frame,
    //     },
    //     {
    //         name: "Sales & Marketing",
    //         url: "#",
    //         icon: PieChart,
    //     },
    //     {
    //         name: "Travel",
    //         url: "#",
    //         icon: Map,
    //     },
    // ],
}