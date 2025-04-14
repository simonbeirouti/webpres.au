'use client';

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, use } from "react";
import { navRoutes } from "@/lib/routes";
import { useUser } from '@/lib/auth';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userPromise } = useUser();
    const user = use(userPromise);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navLinks = navRoutes.map((route, index) => (
        <Link onClick={closeMenu} className={`capitalize ${isActive(route.href) ? 'underline underline-offset-8 font-medium' : ''}`} href={route.href} key={index}>
            {route.path}
        </Link>
    ));

    const authButtons = user ? <Link className="uppercase" href="/dashboard">Dashboard</Link> : <Link className="uppercase" href="/auth">Get Access</Link>;

    return (
        <Card className="fixed top-4 left-4 right-4 p-0 flex justify-between items-center z-50 bg-white/90 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-4 flex justify-between items-center w-full">
                <Link href="/" className="text-xl font-light" onClick={closeMenu}>WEBPRES</Link>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks}
                    <Button onClick={closeMenu} variant="default" asChild>
                        {authButtons}
                    </Button>
                </div>

                <Button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </CardContent>

            {isMenuOpen && (
                <CardContent className="p-4 w-full -mt-6">
                    <div className="grid grid-cols-2 gap-4">
                        {navLinks}
                        <Button onClick={closeMenu} className="col-span-2" variant="default" asChild>
                            {authButtons}
                        </Button>
                    </div>
                </CardContent>
            )}
        </Card>
    );
} 