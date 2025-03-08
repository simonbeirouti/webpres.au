import type { Route } from "./+types/about";
import { createMeta } from "~/lib/meta";
import { useEffect, Fragment } from "react";
import { stagger, useAnimate, motion } from "motion/react";
import { cn } from "~/lib/utils";
import FeaturedWork from "~/components/about/featured-work";
import Services from "~/components/about/services";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "About",
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
  return (
    <Fragment>
      <motion.section
        className="relative flex items-center justify-center text-white p-8 py-48 md:py-64 overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/content/moon.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 1,
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
            Our Story
          </motion.h2>
          <TextGenerateEffect words="WebPres was founded on a simple belief: that powerful web presence should be accessible to everyone. We saw too many businesses struggling with outdated websites or feeling overwhelmed by emerging technologies. We're here to bridge that gap, making tomorrow's web accessible today." />
        </motion.div>
      </motion.section>

      <Services />
      
      <FeaturedWork />

    </Fragment>
  );
}

function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.1,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.1),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-white opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="font-light text-center text-2xl">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
