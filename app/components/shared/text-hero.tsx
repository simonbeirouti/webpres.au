import { motion } from "motion/react";
import TextGenerator from "./text-generation";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

interface TextHeroProps {
    backgroundImage: string;
    title: string;
    words: string;
}

export default function TextHero({
    backgroundImage,
    title,
    words
}: TextHeroProps) {
    return (
        <motion.section
            className="h-[50vh] relative flex items-center justify-center text-white p-8 py-48 md:py-64 overflow-hidden"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.5,
                }}
            />
            <div className="absolute inset-0 bg-black/70 z-0" />
            <motion.div
                className="max-w-4xl mx-auto relative z-10"
                variants={fadeInUp}
            >
                <motion.h2
                    className="text-4xl md:text-6xl font-light mb-8 text-center"
                    variants={fadeInUp}
                >
                    {title}
                </motion.h2>
                <TextGenerator words={words} />
            </motion.div>
        </motion.section>
    )
}