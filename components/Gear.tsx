import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import styles from "./Gear.module.css";

const fallbackGear = [
  {
    id: 1,
    name: "iPhone",
    subtitle: "Primary Camera",
    description: "Shot on the latest iPhone — delivering razor-sharp 4K cinematic footage with unmatched colour science.",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    tags: ["4K Video", "ProRes", "Cinematic Mode"],
  },
  {
    id: 2,
    name: "Gimbal",
    subtitle: "Stabiliser",
    description: "A 3-axis motorised gimbal keeps every shot silky-smooth — no shake, no jitter, pure cinematic flow.",
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    tags: ["3-Axis", "360° Pan", "Follow Mode"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Gear() {
  const [gearList, setGearList] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/gear")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // In real Gear cards, icons are SVGs. 
          // For now, if no icon found in map, use a default fallback
          const mapped = data.map(item => ({
            ...item,
            icon: (icons as any)[item.icon] || (fallbackGear[0].icon)
          }));
          setGearList(mapped);
        } else {
          setGearList(fallbackGear);
        }
      })
      .catch(() => setGearList(fallbackGear));
  }, []);

  return (
    <section id="gear" className={styles.section}>
      {/* Label */}
      <div className={styles.labelRow}>
        <span className={styles.labelLine} />
        <span className={styles.labelText}>Shooting Arsenal</span>
        <span className={styles.labelLine} />
      </div>

      {/* Heading */}
      <h2 className={styles.heading}>My Gear</h2>

      {/* Cards */}
      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {gearList.map((item, i) => (
          <motion.div
            key={item.id}
            className={styles.card}
            variants={cardVariants}
            custom={i}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
          >
            <div className={styles.iconWrap}>{item.icon}</div>
            <div className={styles.cardBody}>
              <span className={styles.subtitle}>{item.subtitle}</span>
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.desc}>{item.description}</p>
              <div className={styles.tags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className={styles.cardAccent} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
