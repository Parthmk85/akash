import React from 'react';
import { motion } from 'framer-motion';
import styles from './Feedback.module.css';

const Feedback = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rohan Mehtat",
      role: "Brand Manager",
      text: "The cinematics and storytelling skills are next level. Working with Akash transformed our brand presence on social media entirely.",
      avatar: "R"
    },
    {
      id: 2,
      name: "Priya Shah",
      role: "Fashion Blogger",
      text: "I've never worked with an editor who understands the 'vibe' so quickly. The transitions are seamless and high-end.",
      avatar: "P"
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Business Owner",
      text: "Fast, professional, and creative. A true certified master of his craft. Highly recommended for any serious business.",
      avatar: "A"
    }
  ];

  return (
    <section className={styles.feedbackContainer}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className={styles.label}>TESTIMONIALS</p>
        <h2 className={styles.title}>What People Say</h2>
      </motion.div>

      <div className={styles.grid}>
        {testimonials.map((item, index) => (
          <motion.div 
            key={item.id} 
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <div className={styles.avatar}>{item.avatar}</div>
            <p className={styles.feedbackText}>"{item.text}"</p>
            <div className={styles.divider}></div>
            <h4 className={styles.name}>{item.name}</h4>
            <p className={styles.role}>{item.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Feedback;
