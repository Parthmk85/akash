import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Feedback.module.css';

const fallbackTestimonials = [
  {
    id: 1,
    name: "Rohan Mehta",
    role: "Brand Manager",
    brand: "Urban Leaf",
    text: "Akash e amara campaign na shots ne evu story ma convert karya ke loko ne instantly yaad rahi gaya. Pahla hafta ma j engagement vadhi gayu ane content full premium lagyu.",
    avatar: "R",
    metric: "+42% engagement"
  },
  {
    id: 2,
    name: "Priya Shah",
    role: "Fashion Blogger",
    brand: "Style Journal",
    text: "Mood, pacing ane luxury look Akash turant samji jay che. Mane vibe explain pan ochhi karvi padi ane final reel reference karta pan better aavi.",
    avatar: "P",
    metric: "Same-day revisions"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Business Owner",
    brand: "Patel Ventures",
    text: "Fast che, professional che ane kaam ma ekdum sharp che. Business ne serious ane modern look aapvo hoy to Akash par bharoso kari sakay.",
    avatar: "A",
    metric: "Booked 3 launches"
  },
  {
    id: 4,
    name: "Neha Desai",
    role: "Wedding Filmmaker",
    brand: "Desai Stories",
    text: "Hu e ne tough multi-camera edit moklyo hato almost brief vagar. Ene emotion pakdi lidho, pacing clean kari ane akhi film ne cinematic feel api.",
    avatar: "N",
    metric: "48-hour turnaround"
  },
  {
    id: 5,
    name: "Jay Solanki",
    role: "Music Artist",
    brand: "Independent Release",
    text: "Mara music videos finally proper release jeva dekhava lagya, normal social clips jeva nahi. Ena cuts musical che, stylish che ane perfectly timed che.",
    avatar: "J",
    metric: "+118k reel views"
  },
  {
    id: 6,
    name: "Kavya Trivedi",
    role: "Beauty Creator",
    brand: "Glow Theory",
    text: "Mara beauty reels ni retention clearly improve thai, karan ke Akash ne exactly khabar che kyare frame change karvo ane kyare visual energy high rakhvi.",
    avatar: "K",
    metric: "+31% watch time"
  },
  {
    id: 7,
    name: "Harsh Vora",
    role: "Restaurant Founder",
    brand: "Table 27",
    text: "Akash e amara local restaurant ne pan luxury destination jevi feel api. Darekh video ma atmosphere, appetite ane brand ni alag identity dekhaay che.",
    avatar: "H",
    metric: "Sold-out launch weekend"
  },
  {
    id: 8,
    name: "Mitali Joshi",
    role: "Lifestyle Creator",
    brand: "Daily By Mitali",
    text: "Creative pan che ane reliable pan, aa combo khub rare male. Files properly organized hoy, revisions smooth hoy ane final output hamesha elevated lage.",
    avatar: "M",
    metric: "Zero missed deadlines"
  },
  {
    id: 9,
    name: "Devang Bhatt",
    role: "Startup Founder",
    brand: "LaunchSprint",
    text: "Amne founder-led content joiye hato je polished lage pan fake na lage. Akash e exact balance pakdi ne brand ne strong public face aapyu.",
    avatar: "D",
    metric: "+3 investor callbacks"
  },
  {
    id: 10,
    name: "Sonal Parmar",
    role: "Event Curator",
    brand: "House of Events",
    text: "Ene amara event ni energy perfectly capture kari ane ene eva reels ma convert kari ke badhu live feel thay. Sponsors e pan puchyu ke edit ane visual direction kone handle kari.",
    avatar: "S",
    metric: "Sponsor-approved edits"
  }
];

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/feedback")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFeedbackList(data);
        } else {
          setFeedbackList(fallbackTestimonials);
        }
      })
      .catch(() => setFeedbackList(fallbackTestimonials));
  }, []);

  const marqueeTestimonials = [...feedbackList, ...feedbackList];

  if (feedbackList.length === 0) return null;

  return (
    <section className={styles.feedbackContainer}>
      <div className={styles.backdropGlow} aria-hidden="true" />
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className={styles.label}>TESTIMONIALS</p>
        <h2 className={styles.title}>What People Say</h2>
        <p className={styles.subtitle}>
          Creators, founders ane brands taraf thi real feedback, jemne content ma strong impact ane premium visual quality joi ti hati.
        </p>
      </motion.div>

      <div className={styles.marqueeShell}>
        <div className={styles.edgeFadeLeft} aria-hidden="true" />
        <div className={styles.edgeFadeRight} aria-hidden="true" />

        <div className={styles.marqueeTrack}>
          {marqueeTestimonials.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className={styles.card}
              aria-hidden={index >= feedbackList.length}
            >
              <div className={styles.cardTopLine} />
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>{item.avatar}</div>
                <div className={styles.identity}>
                  <h4 className={styles.name}>{item.name}</h4>
                  <p className={styles.role}>{item.role}</p>
                </div>
              </div>

              <p className={styles.rating}>★★★★★</p>
              <p className={styles.feedbackText}>“{item.text}”</p>

              <div className={styles.cardFooter}>
                <span className={styles.brand}>{item.brand}</span>
                <span className={styles.metric}>{item.metric}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
