"use client";

import { motion, MotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./ScrollPageChrome.module.css";

export interface SinglePageSection {
  id: string;
  label: string;
  shortLabel: string;
}

interface ScrollPageChromeProps {
  scrollYProgress: MotionValue<number>;
  sections: SinglePageSection[];
}

export default function ScrollPageChrome({ scrollYProgress, sections }: ScrollPageChromeProps) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? "home");
  const [progressLabel, setProgressLabel] = useState("0%");

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgressLabel(`${Math.round(value * 100)}%`);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const currentEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (currentEntry) {
          setActiveSectionId((currentEntry.target as HTMLElement).id);
        }
      },
      {
        rootMargin: "-32% 0px -42% 0px",
        threshold: [0.2, 0.35, 0.5, 0.75],
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0];

  return (
    <>
      <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} />

      <aside className={styles.sectionDock} aria-label="Single page section navigation">
        {sections.map((section) => {
          const isActive = section.id === activeSectionId;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.sectionDot} ${isActive ? styles.active : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className={styles.shortLabel}>{section.shortLabel}</span>
              <span className={styles.fullLabel}>{section.label}</span>
            </a>
          );
        })}
      </aside>

      <motion.div
        className={styles.scrollBadge}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.progressValue}>{progressLabel}</span>
        <div>
          <p className={styles.badgeLabel}>Single Page Flow</p>
          <strong className={styles.badgeSection}>{activeSection?.label}</strong>
        </div>
      </motion.div>
    </>
  );
}