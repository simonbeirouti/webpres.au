import { Outlet } from "react-router";
import FooterSection from "./footer";
import { Navigation } from "./navigation";
import { useSection } from "~/hooks/useSection";

export default function MainLayout() {
    const { sectionsRef } = useSection();

    return (
        <div className="h-screen overflow-hidden">
            <Navigation />
            <div ref={sectionsRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
                <Outlet />
                <FooterSection />
            </div>
        </div>
    );
}