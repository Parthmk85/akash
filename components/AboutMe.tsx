import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './AboutMe.module.css';

// Premium icons for Skills
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

const skillCategories = [
  {
    title: "Strategy & Growth",
    icon: icons.strategy,
    skills: ["Social Media Strategy", "Influencer Marketing", "Trend Research", "Community Engagement"]
  },
  {
    title: "Visual Production",
    icon: icons.production,
    skills: ["Video Shooting & Editing", "Short-form Content", "Long-form Video", "Storyboarding"]
  },
  {
    title: "Creative & Stats",
    icon: icons.creative,
    skills: ["Graphic Design (Canva)", "Analytics & Tracking"]
  }
];

const AboutMe = () => {
  return (
    <section id="about" className={styles.aboutContainer}>
      <div className={styles.content}>
        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
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
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className={styles.skillsSection}>
            <div className={styles.rowHeading}>
              <span className={styles.headingLine} />
              <h2 className={styles.skillsHeading}>Methodology & Skills</h2>
              <span className={styles.headingLine} />
            </div>
            <div className={styles.skillsGrid}>
              {skillCategories.map((cat, i) => (
                <motion.div 
                  key={i} 
                  className={styles.skillCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className={styles.skillCardHeader}>
                    <span className={styles.skillCardIcon}>{cat.icon}</span>
                    <h4 className={styles.skillCardTitle}>{cat.title}</h4>
                  </div>
                  <ul className={styles.skillItemList}>
                    {cat.skills.map((s, j) => (
                      <li key={j} className={styles.skillItem}>
                        <span className={styles.skillDot} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className={styles.action}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <button className={styles.contactBtn}>Contact Me</button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
