import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './AboutMe.module.css';

const icons = {
  strategy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4M12 8v8"/>
    </svg>
  ),
  production: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
  ),
  creative: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v8"/><path d="m4.93 4.93 5.66 5.66"/><path d="M2 12h8"/><path d="m4.93 19.07 5.66-5.66"/><path d="M12 22v-8"/><path d="m19.07 19.07-5.66-5.66"/><path d="M22 12h-8"/><path d="m19.07 4.93-5.66 5.66"/>
    </svg>
  )
};

type IconKey = keyof typeof icons;

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

interface ApiSkillCategory {
  title: string;
  icon?: IconKey | string;
  skills: string[];
}

const fallbackSkillCategories: SkillCategory[] = [
  {
    title: 'Strategy & Growth',
    icon: icons.strategy,
    skills: ['Social Media Strategy', 'Influencer Marketing', 'Trend Research', 'Community Engagement']
  },
  {
    title: 'Visual Production',
    icon: icons.production,
    skills: ['Video Shooting & Editing', 'Short-form Content', 'Long-form Video', 'Storyboarding']
  },
  {
    title: 'Creative & Stats',
    icon: icons.creative,
    skills: ['Graphic Design (Canva)', 'Analytics & Tracking']
  }
];

const AboutMe = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetch('/api/skills')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = (data as ApiSkillCategory[]).map((category) => ({
            title: category.title,
            skills: category.skills,
            icon: icons[category.icon as IconKey] || icons.creative
          }));

          setSkillCategories(mapped);
          return;
        }

        setSkillCategories(fallbackSkillCategories);
      })
      .catch(() => setSkillCategories(fallbackSkillCategories));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || skillCategories.length === 0) {
      return;
    }

    let frameId = 0;

    const updateActiveCard = () => {
      frameId = 0;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const travelledDistance = Math.min(Math.max(-rect.top, 0), scrollableDistance);
      const progress = travelledDistance / scrollableDistance;
      const nextIndex = Math.min(skillCategories.length - 1, Math.floor(progress * skillCategories.length));

      setActiveIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
    };

    const handleScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveCard);
    };

    updateActiveCard();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [skillCategories.length]);

  if (skillCategories.length === 0) return null;

  const activeCategory = skillCategories[activeIndex] ?? fallbackSkillCategories[0];

  return (
    <section id="about" ref={sectionRef} className={styles.aboutContainer}>
      <div className={styles.stickyFrame}>
        <div className={styles.content}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className={styles.imageOverlay}></div>
            <Image
              src="/assets/img3.jpeg"
              alt="Akash Official Profile"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.aboutImage}
              style={{ objectFit: 'cover' }}
            />
          </motion.div>

          <motion.div
            className={styles.textWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            <div className={styles.skillsSection}>
              <div className={styles.rowHeading}>
                <span className={styles.headingLine} />
                <h2 className={styles.skillsHeading}>Methodology & Skills</h2>
                <span className={styles.headingLine} />
              </div>

              <div className={styles.storyStatus}>
                <span className={styles.stepLabel}>Step {String(activeIndex + 1).padStart(2, '0')}</span>
                <div className={styles.progressDots}>
                  {skillCategories.map((category, index) => (
                    <span
                      key={category.title}
                      className={`${styles.progressDot} ${index === activeIndex ? styles.progressDotActive : ''}`}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.cardStage}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeCategory.title}
                    className={styles.skillCardSingle}
                    initial={{ opacity: 0, x: 140, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -140, scale: 0.94 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.skillCardHeader}>
                      <span className={styles.skillCardIcon}>{activeCategory.icon}</span>
                      <h4 className={styles.skillCardTitle}>{activeCategory.title}</h4>
                    </div>

                    <ul className={styles.skillItemList}>
                      {activeCategory.skills.map((skill, index) => (
                        <motion.li
                          key={`${activeCategory.title}-${skill}`}
                          className={styles.skillItem}
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + index * 0.08, duration: 0.35 }}
                        >
                          <span className={styles.skillDot} />
                          {skill}
                        </motion.li>
                      ))}
                    </ul>

                    <p className={styles.cardFootnote}>Scroll down and the current box moves left while the next one enters from the right.</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className={styles.scrollHint}>Aa section par scroll temporarily lock jevu feel aavshe. Tran box ek-ek kari reveal thashe, pachi j next section ma page move thashe.</p>

            <motion.div
              className={styles.action}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <a href="#contact" className={styles.contactBtn}>Contact Me</a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
