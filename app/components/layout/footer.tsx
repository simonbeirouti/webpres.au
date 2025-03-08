import { Link } from "react-router";
import { useLocation } from "react-router";

export default function FooterSection() {
    const location = useLocation();

    if (location.pathname === "/" || location.pathname === "/contact") {
        return null;
    }

    return (
        <section className="bg-black text-white flex items-center justify-center m-4 rounded-lg px-6 py-48">
            <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-light mb-8">Ready to transform your web presence?</h2>
                <p className="text-xl md:text-2xl mb-12">Let's discuss how WebPres can help you achieve your digital goals.</p>
                <Link
                    to="/contact"
                    className="uppercase inline-block bg-white text-black px-8 py-4 text-xl font-bold hover:bg-purple-100 transition-colors rounded-lg"
                >
                    Contact
                </Link>
            </div>
        </section>
    )
}