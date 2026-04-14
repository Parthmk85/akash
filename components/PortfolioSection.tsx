import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './PortfolioSection.module.css';

const PortfolioSection = () => {
  const projects = [
    {
      id: 1,
      title: "Vibrant Gujarat Reels",
      category: "Video Editing",
      image: "/assets/img2.jpeg",
      stats: { likes: "12k", views: "250k" }
    },
    {
      id: 2,
      title: "Fashion Content Series",
      category: "Influencer Campaign",
      image: "/assets/im3.jpeg",
      stats: { likes: "8.5k", views: "180k" }
    },
    {
      id: 3,
      title: "Modern Studio Sessions",
      category: "Content Strategy",
      image: "/assets/img3.jpeg",
      stats: { likes: "15k", views: "320k" }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="portfolio" className={styles.portfolioContainer}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className={styles.label}>MY WORK</p>
        <h2 className={styles.title}>Refining Digital Storytelling</h2>
      </motion.div>

      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            className={styles.card}
            variants={itemVariants}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33.3vw"
              />
              <div className={styles.overlay}>
                <div className={styles.projectInfo}>
                  <p className={styles.projectCategory}>{project.category}</p>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
                <div className={styles.cardStats}>
                   <div className={styles.stat}>
                      <span className={styles.statVal}>{project.stats.likes}</span>
                      <span className={styles.statLabel}>LIKES</span>
                   </div>
                   <div className={styles.stat}>
                      <span className={styles.statVal}>{project.stats.views}</span>
                      <span className={styles.statLabel}>VIEWS</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PortfolioSection;
