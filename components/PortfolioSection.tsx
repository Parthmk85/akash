import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './PortfolioSection.module.css';

interface Project {
  _id?: string;
  id?: number;
  title: string;
  category: string;
  image: string;
  link: string;
  stats: { likes: string; views: string };
}

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Ahmedabad Car Delivery 📸🎥",
    category: "Video Editing",
    image: "https://scontent-bom5-1.cdninstagram.com/v/t51.71878-15/660498911_2213963789373975_907385287373348062_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=105&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=KMv7fi1UjlAQ7kNvwGAgO9c&_nc_oc=AdpwbvqNhmtP9c5AJ0eZtc4oJJ2PxXxMyeVIBOG5VAsuq3UVuKi_Srp3MH8YCWPYawA&_nc_zt=23&_nc_ht=scontent-bom5-1.cdninstagram.com&_nc_gid=Ylo4lAFjJasJsTnZe3K8Aw&_nc_ss=7a289&oh=00_Af3FrnIaht9R1LjjDHsydGYL-IjtxuWvePEPqxoYg5IcOQ&oe=69E61FDA",
    link: "https://www.instagram.com/reel/DW0hRrTDUj4/",
    stats: { likes: "15k", views: "300k" }
  },
  {
    id: 2,
    title: "Girte Girte Bachaa 😩🤯",
    category: "Content Strategy",
    image: "https://scontent-bom5-2.cdninstagram.com/v/t51.71878-15/660266898_1678862373297967_7613755197838511542_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=1KSl3CPqKNEQ7kNvwEVG9pg&_nc_oc=AdpRERacz7kI3iJyoE2bSCDeICwqsKHzCruG1cEVsG0HzgE84BDBMRU0oWXHYbhxakU&_nc_zt=23&_nc_ht=scontent-bom5-2.cdninstagram.com&_nc_gid=4_4yf8a_LNNfpTQTHBmTSg&_nc_ss=7a289&oh=00_Af0CwfaO3C4nw8u7Cz2OIc_uA5wIxW6QKWUbIX2a-AjpfQ&oe=69E62690",
    link: "https://www.instagram.com/reel/DWwTH3jj7pP/",
    stats: { likes: "22k", views: "450k" }
  },
  {
    id: 3,
    title: "Birthday Shoot 🔥",
    category: "Video Editing",
    image: "https://scontent-bom5-2.cdninstagram.com/v/t51.71878-15/670271336_2576376136093192_344126153858607722_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=HQ_XtDP5ahsQ7kNvwHfPVy-&_nc_oc=AdqMT9g_5JYaNmooOZRaS0BVM2ANbURH7r8zLCzI_CEefY_ZB5Wz_dng_GN-2CAiaH8&_nc_zt=23&_nc_ht=scontent-bom5-2.cdninstagram.com&_nc_gid=W9rEIWBP-ebj7oB13Kp1zQ&_nc_ss=7a289&oh=00_Af3jvUshxYMvhYUYBuylBrK_EKt5DzPbLAoNpmXejn973A&oe=69E6512B",
    link: "https://www.instagram.com/reel/DW_ep-4iu44/",
    stats: { likes: "18k", views: "380k" }
  }
];

const PortfolioSection = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const r = await fetch("/api/projects");
        const data = await r.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setIsLive(true);
        }
      } catch (err) {
        console.error("Failed to fetch projects, using fallback:", err);
      }
    }
    loadProjects();
  }, []);

  return (
    <section id="portfolio" className={styles.portfolioContainer}>
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className={styles.label}>MY WORK</p>
        <h2 className={styles.title}>Some of My Trending Reels</h2>
      </motion.div>

      <div className={styles.marqueeShell}>
        <div className={styles.edgeFadeLeft} aria-hidden="true" />
        <div className={styles.edgeFadeRight} aria-hidden="true" />

        <div className={styles.marqueeTrack}>
          {[0, 1].map((group) => (
            <div key={group} className={styles.marqueeGroup} aria-hidden={group === 1}>
              {projects.map((project, index) => (
                <a 
                  key={`${group}-${project._id ?? project.id}-${index}`}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  <span className={styles.playBadge} aria-hidden="true">▶</span>
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className={styles.image}
                      unoptimized={true}
                      sizes="(max-width: 768px) 80vw, 320px"
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
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
