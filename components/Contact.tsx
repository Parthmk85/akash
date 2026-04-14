import React from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const contactDetails = [
  {
    icon: "📞",
    label: "PHONE",
    value: "+91 88663 37539",
    href: "tel:+918866337539",
  },
  {
    icon: "✉️",
    label: "EMAIL",
    value: "akashudeshi@gmail.com",
    href: "mailto:akashudeshi@gmail.com",
  },
  {
    icon: "📍",
    label: "LOCATION",
    value: "Kaliyabid, Bhavnagar, Gujarat",
    href: "https://maps.google.com/?q=Kaliyabid,Bhavnagar",
  },
  {
    icon: "🌐",
    label: "LANGUAGES",
    value: "Gujarati · Hindi · English",
    href: null,
  },
];

const Contact = () => {
  return (
    <section id="contact" className={styles.contactContainer}>
      <div className={styles.content}>
        <motion.div
          className={styles.textSide}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className={styles.label}>GET IN TOUCH</p>
          <h2 className={styles.title}>Let&apos;s Create Something Remarkable Together</h2>
          <p className={styles.description}>
            Ready to elevate your digital presence? Whether it&apos;s a social media campaign or a
            high-end video project, I&apos;m here to bring your vision to life.
          </p>

          <div className={styles.infoList}>
            {contactDetails.map((item) => (
              <div className={styles.infoItem} key={item.label}>
                <span className={styles.infoIcon}>{item.icon}</span>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={styles.infoValue}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className={styles.infoValue}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.formSide}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label>YOUR NAME</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className={styles.inputGroup}>
              <label>YOUR EMAIL</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className={styles.inputGroup}>
              <label>YOUR MESSAGE</label>
              <textarea placeholder="Tell me about your project" rows={5}></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>SEND MESSAGE</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
