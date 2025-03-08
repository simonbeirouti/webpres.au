import type { Route } from "./+types/about";
import { createMeta } from "~/lib/meta";
import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import { useSection } from "~/hooks/useSection";

export function meta({}: Route.MetaArgs) {
  return createMeta({
    title: "About WebPres",
    description: "Learn about WebPres - Empowering businesses to thrive in the evolving digital landscape",
    url: "/about",
  });
}

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

export default function About() {
  const { sectionsRef, scrollToNextSection } = useSection();

  const values = [
    {
      title: "Innovation",
      description: "We stay at the forefront of web technologies to bring you solutions that last."
    },
    {
      title: "Accessibility",
      description: "We believe powerful digital tools should be available and understandable to all."
    },
    {
      title: "Partnership",
      description: "We work with you, not just for you. Your success is our success."
    },
    {
      title: "Forward-thinking",
      description: "We build with the future in mind, ensuring your digital presence evolves with technology."
    }
  ];

  return (
    <div className="h-screen overflow-hidden">
      <div ref={sectionsRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
        {/* Mission Section */}
        <div className="relative h-screen snap-start pt-[64px]">
          <motion.div 
            className="h-full flex items-center justify-center p-8"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              variants={fadeInUp}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-light mb-8"
                variants={fadeInUp}
              >
                Our Mission
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 leading-relaxed"
                variants={fadeInUp}
              >
                Empowering businesses to thrive in the evolving digital landscape by creating meaningful connections between technology and human experience.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Story Section */}
        <motion.section 
          className="h-screen flex items-center justify-center bg-black text-white p-8 snap-start"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-light mb-8 text-center"
              variants={fadeInUp}
            >
              Our Story
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl leading-relaxed text-gray-300"
              variants={fadeInUp}
            >
              WebPres was founded on a simple belief: that powerful web presence should be accessible to everyone. We saw too many businesses struggling with outdated websites or feeling overwhelmed by emerging technologies. We're here to bridge that gap, making tomorrow's web accessible today.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          className="h-screen flex items-center justify-center p-8 snap-start"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-6xl font-light mb-16 text-center"
              variants={fadeInUp}
            >
              Our Values
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerChildren}
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-sm border border-gray-200/20 hover:border-gray-200/40 transition-all">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-light mb-4">{value.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
