import { useEffect, useRef, useState } from "react";

export function useSection() {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    if (sectionsRef.current) {
      const nextSection = currentSection + 1;
      sectionsRef.current.scrollTo({
        top: nextSection * window.innerHeight,
        behavior: 'smooth'
      });
      setCurrentSection(nextSection);
    }
  };

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (sectionsRef.current) {
        const section = Math.round(sectionsRef.current.scrollTop / window.innerHeight);
        setCurrentSection(section);
      }
    };

    const sectionsElement = sectionsRef.current;
    if (sectionsElement) {
      sectionsElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sectionsElement) {
        sectionsElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return {
    currentSection,
    sectionsRef,
    scrollToNextSection
  };
} 