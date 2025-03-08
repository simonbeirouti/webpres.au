import { Link } from "react-router";

export default function FooterSection() {
    return (
        <section className="h-screen bg-black text-white snap-start flex items-center justify-center p-8">
            <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform your web presence?</h2>
                <p className="text-xl md:text-2xl mb-12">Let's discuss how WebPres can help you achieve your digital goals.</p>
                <Link
                    to="/contact"
                    className="inline-block bg-white text-black px-8 py-4 text-xl font-bold hover:bg-purple-100 transition-colors"
                >
                    Get in Touch
                </Link>
            </div>
        </section>
    )
}