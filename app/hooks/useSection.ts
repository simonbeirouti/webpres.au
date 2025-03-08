import { useEffect, useRef, useState } from "react";

type TimeoutRef = ReturnType<typeof setTimeout>;

export function useSection() {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<TimeoutRef>(undefined);

  const scrollToSection = (section: number) => {
    if (sectionsRef.current) {
      const totalSections = sectionsRef.current.querySelectorAll('section').length;
      if (section >= 0 && section < totalSections) {
        sectionsRef.current.scrollTo({
          top: section * window.innerHeight,
          behavior: 'smooth'
        });
        setCurrentSection(section);
      }
    }
  };

  const scrollToNextSection = () => {
    if (sectionsRef.current) {
      const totalSections = sectionsRef.current.querySelectorAll('section').length;
      const nextSection = currentSection + 1;
      if (nextSection < totalSections) {
        scrollToSection(nextSection);
      }
    }
  };

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (sectionsRef.current) {
        // Clear the previous timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        // Get the current scroll position and viewport height
        const scrollTop = sectionsRef.current.scrollTop;
        const viewportHeight = window.innerHeight;
        const totalHeight = sectionsRef.current.scrollHeight;
        const totalSections = Math.round(totalHeight / viewportHeight);

        // Calculate the current section, ensuring we don't exceed bounds
        const rawSection = scrollTop / viewportHeight;
        const section = Math.min(
          Math.max(0, Math.round(rawSection)),
          totalSections - 1
        );

        // Update the current section
        setCurrentSection(section);

        // Set a new timeout to snap to the nearest section after scrolling stops
        scrollTimeout.current = setTimeout(() => {
          scrollToSection(section);
        }, 50);
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
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return {
    currentSection,
    sectionsRef,
    scrollToNextSection
  };
} 