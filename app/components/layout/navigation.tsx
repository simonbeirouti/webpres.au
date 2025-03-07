import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { navRoutes } from "~/routes";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function getRouteDisplayName(navRoutes: any[]): Array<{ path: string; isButton?: boolean }> {
    return navRoutes.map(route => ({
        path: route.path,
        isButton: route.path.toLowerCase() === 'contact'
    }));
}

const cleanRoutes = getRouteDisplayName(navRoutes);

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const renderNavLink = (route: { path: string; isButton?: boolean }, index: number) => {
        if (route.isButton) {
            return (
                <Button key={index} variant="default" asChild className="w-full sm:w-auto bg-black hover:bg-black/90">
                    <Link to={`/${route.path}`}>{route.path.toUpperCase()}</Link>
                </Button>
            );
        }

        return (
            <NavLink
                key={index}
                to={`/${route.path}`}
                className={({ isActive }) =>
                    `hover:underline hover:underline-offset-8 font-medium ${isActive ? "underline underline-offset-8 font-medium" : ""
                    }`
                }
            >
                {route.path.charAt(0).toUpperCase() + route.path.slice(1)}
            </NavLink>
        );
    };

    return (
        <Card className="fixed top-4 left-4 right-4 p-0 flex justify-between items-center z-50 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 hover:shadow-xl transition-all">
            <CardContent className="p-4 flex justify-between items-center w-full">
                <Link to="/" className="text-xl font-semibold">WEBPRES</Link>

                <div className="hidden md:flex items-center space-x-8">
                    {cleanRoutes.map((route, index) => renderNavLink(route, index))}
                </div>

                <button
                    className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu size={24} />
                </button>
            </CardContent>

            {isMenuOpen && (
                <CardContent className="p-4 w-full -mt-6">
                    <div className="flex flex-col space-y-4">
                        {cleanRoutes.map((route, index) => (
                            <div key={index} className={cn("w-full", route.isButton && "w-full")}>
                                {renderNavLink(route, index)}
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}
        </Card>
    );
} 