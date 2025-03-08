import { Outlet } from "react-router";
import FooterSection from "./footer";
import { Navigation } from "./navigation";
import { Fragment } from "react";

export default function MainLayout() {
    return (
        <Fragment>
            <Navigation />
            <Outlet />
            <FooterSection />
        </Fragment>
    );
}