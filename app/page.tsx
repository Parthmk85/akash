"use client"

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import PortfolioSection from "@/components/PortfolioSection";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";
import Education from "@/components/Education";
import Feedback from "@/components/Feedback";
import Contact from "@/components/Contact";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY1 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageY2 = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const imageY3 = useTransform(scrollYProgress, [0, 1], ["0%", "65%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className="flex flex-col min-h-screen" style={{ overflowX: 'hidden' }}>
      <Navbar />

      <main>
        {/* ── HERO SECTION ─────────────────────────────────── */}
        <section id="home" className="hero-v2" ref={heroRef}>

          {/* LEFT — Content Panel */}
          <motion.div
            className="hero-left"
            style={{ y: textY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Top label */}
            <motion.div
              className="hero-label"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="label-line" />
              <span className="label-text">Creative Director &amp; Influencer</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="hero-heading"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="heading-thin">Vision</span>
              <br />
              <span className="heading-bold">of Akash</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="hero-para"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Blending cinematic storytelling with digital influence —<br />
              crafting legacies across the social landscape.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="stat">
                <span className="stat-num">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">1000+</span>
                <span className="stat-label">Projects Done</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">10K+</span>
                <span className="stat-label">Followers</span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="hero-cta-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Link href="#contact" className="btn-primary">
                Start a Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="#portfolio" className="btn-outline">
                View Work
              </Link>
            </motion.div>

            {/* Social icons */}
            <motion.div
              className="hero-socials-v2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <a href="#" aria-label="Instagram" className="social-v2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="social-v2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-v2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

        {/* RIGHT — Image Panel (Single Clean Image) */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main Large Image (im3.jpeg) */}
          <motion.div className="hero-img-wrap layer-main" style={{ y: imageY1 }}>
            <Image
              src="/assets/im3.jpeg"
              alt="Akash — Main Creator"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center center' }}
              priority
            />
            <div className="img-fade-left" />
            <div className="img-fade-bottom" />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            className="floating-badge"
            initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 100 100" width="115" height="115" className="badge-svg-rotate">
              <path id="bp" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
              <text fontSize="8.2" fontWeight="700" letterSpacing="2.5" fill="currentColor" textAnchor="middle" fontFamily="inherit">
                <textPath xlinkHref="#bp">VIDEO EDITOR • DIRECTOR • CREATOR •</textPath>
              </text>
            </svg>
            <div className="badge-center-dot" />
          </motion.div>

          {/* Floating availability card */}
          <motion.div
            className="avail-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <span className="avail-pulse" />
            <span className="avail-text">ALL GUJARAT SERVICE AVAILABLE</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator ignored for brevity */}
        <div className="scroll-padding" style={{ height: '5vh' }} />
      </section>

      {/* Rest of sections */}
      <motion.div {...fadeInUp}>
        <AboutMe />
      </motion.div>

        <motion.div {...fadeInUp}>
          <Services />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Education />
        </motion.div>

        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
          <PortfolioSection />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Feedback />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Contact />
        </motion.div>
      </main>

      <footer className="footer-note">
        {/* Optional footer content */}
      </footer>
    </div>
  );
}
