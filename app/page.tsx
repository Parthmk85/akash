"use client"
import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import ScrollPageChrome, { SinglePageSection } from "@/components/ScrollPageChrome";
import ScrollTimelineItem from "@/components/ScrollTimelineItem";
import ScrollStoryStrip from "@/components/ScrollStoryStrip";
import SplashScreen from "@/components/SplashScreen";

// Dynamically import client components to prevent SSR/Hydration issues
const PortfolioSection = dynamic(() => import("@/components/PortfolioSection"), { ssr: false });
const AboutMe = dynamic(() => import("@/components/AboutMe"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const Education = dynamic(() => import("@/components/Education"), { ssr: false });
const Gear = dynamic(() => import("@/components/Gear"), { ssr: false });
const Feedback = dynamic(() => import("@/components/Feedback"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
import HeroVisuals from "@/components/HeroVisuals";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroSocial {
  platform: string;
  url: string;
}

interface HomeSettings {
  heroSubTitle?: string;
  heroTitle?: string;
  heroDescription?: string;
  stats?: HeroStat[];
  socials?: HeroSocial[];
}

const singlePageSections: SinglePageSection[] = [
  { id: "home", label: "Home", shortLabel: "00" },
  { id: "story", label: "Story Mode", shortLabel: "01" },
  { id: "about", label: "About", shortLabel: "02" },
  { id: "services", label: "Services", shortLabel: "03" },
  { id: "education", label: "Education", shortLabel: "04" },
  { id: "gear", label: "Gear", shortLabel: "05" },
  { id: "portfolio", label: "Portfolio", shortLabel: "06" },
  { id: "feedback", label: "Feedback", shortLabel: "07" },
  { id: "contact", label: "Contact", shortLabel: "08" },
];

export default function Home() {
  const [settings, setSettings] = useState<HomeSettings | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const { scrollYProgress } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 0.35], ["0%", "15%"]);
  const timelineProgress = useTransform(scrollYProgress, [0.08, 0.95], [0, 1]);
  const heroStats = settings?.stats ?? [];
  const heroSocials = settings?.socials ?? [];

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) setSettings(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 2400);
    document.body.classList.toggle("splash-active", showSplash);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("splash-active");
    };
  }, [showSplash]);

  return (
    <div className="flex flex-col min-h-screen" style={{ overflowX: 'hidden' }}>
      <SplashScreen visible={showSplash} onSkip={() => setShowSplash(false)} />
      <Navbar />
      <ScrollPageChrome scrollYProgress={scrollYProgress} sections={singlePageSections} />

      {!showSplash ? (
      <main>
        {/* ── HERO SECTION ─────────────────────────────────── */}
        <section id="home" className="hero-v2">
          {/* LEFT — Content Panel */}
          <motion.div
            className="hero-left"
            style={{ y: textY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="hero-label"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="label-line" />
              <span className="label-text">{settings?.heroSubTitle || "Creative Director & Influencer"}</span>
            </motion.div>

            <motion.h1
              className="hero-heading"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
               <span className="heading-thin">{settings?.heroTitle?.split(' ')[0] || "Vision"}</span>
              <br />
              <span className="heading-bold">{settings?.heroTitle?.split(' ').slice(1).join(' ') || "of Akash"}</span>
            </motion.h1>

            <motion.p
              className="hero-para"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {settings?.heroDescription || "Blending cinematic storytelling with digital influence — crafting legacies across the social landscape."}
            </motion.p>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {heroStats.length > 0 ? (
                heroStats.map((stat, i: number) => (
                  <React.Fragment key={i}>
                    <div className="stat">
                      <span className="stat-num">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                    {i < heroStats.length - 1 && <div className="stat-divider" />}
                  </React.Fragment>
                ))
              ) : (
                <>
                  <div className="stat"><span className="stat-num">5+</span><span className="stat-label">Years Experience</span></div>
                  <div className="stat-divider" /><div className="stat"><span className="stat-num">1000+</span><span className="stat-label">Projects Done</span></div>
                  <div className="stat-divider" /><div className="stat"><span className="stat-num">10K+</span><span className="stat-label">Followers</span></div>
                </>
              )}
            </motion.div>

            <motion.div
              className="hero-cta-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <a href="#contact" className="btn-primary">
                Start a Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#portfolio" className="btn-outline">View Work</a>
            </motion.div>

            <motion.div
              className="hero-socials-v2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {heroSocials.length > 0 ? (
                heroSocials.map((social, i: number) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="social-v2">
                     <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{social.platform}</span>
                  </a>
                ))
              ) : (
                <>
                  <a href="https://www.instagram.com/vision_of_akash" target="_blank" rel="noopener noreferrer" className="social-v2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </a>
                  <a href="https://www.facebook.com/visionofakash" target="_blank" rel="noopener noreferrer" className="social-v2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M15 3h-2.2a4.3 4.3 0 0 0-4.3 4.3V10H6v4h2.5v7h4v-7H15l1-4h-3.5V7.6c0-.9.7-1.6 1.6-1.6H16V3h-1z" />
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@vision_of_akash" target="_blank" rel="noopener noreferrer" className="social-v2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 12s0-3.7-.5-5.4a2.8 2.8 0 0 0-2-2C17.7 4 12 4 12 4s-5.7 0-7.5.6a2.8 2.8 0 0 0-2 2C2 8.3 2 12 2 12s0 3.7.5 5.4a2.8 2.8 0 0 0 2 2C6.3 20 12 20 12 20s5.7 0 7.5-.6a2.8 2.8 0 0 0 2-2C22 15.7 22 12 22 12z" />
                      <path d="m10 9 5 3-5 3V9z" />
                    </svg>
                  </a>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* RIGHT — Hero Visuals (extracted or kept inline but wrapped) */}
          <HeroVisuals scrollYProgress={scrollYProgress} />

          {/* ALL GUJARAT SERVICE AVAILABLE tag — scrolls with hero */}
          <motion.a
            href="#contact"
            className="live-floating-btn"
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -2, x: "-50%" }}
            whileTap={{ scale: 0.95, x: "-50%" }}
          >
            <span className="live-dot" />
            <span className="live-text">ALL GUJARAT SERVICE AVAILABLE</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </motion.a>
        </section>

        <ScrollStoryStrip scrollYProgress={scrollYProgress} />

        <section className="scroll-timeline">
          <motion.span className="scroll-timeline__progress" style={{ scaleY: timelineProgress }} />

          <ScrollTimelineItem label="01 / About">
            <AboutMe />
          </ScrollTimelineItem>

          <ScrollTimelineItem label="02 / Services">
            <Services />
          </ScrollTimelineItem>

          <ScrollTimelineItem label="03 / Education">
            <Education />
          </ScrollTimelineItem>

          <ScrollTimelineItem label="04 / Gear">
            <Gear />
          </ScrollTimelineItem>

          <ScrollTimelineItem label="05 / Portfolio">
            <PortfolioSection />
          </ScrollTimelineItem>

          <ScrollTimelineItem label="06 / Feedback">
            <div id="feedback">
              <Feedback />
            </div>
          </ScrollTimelineItem>

          <ScrollTimelineItem label="07 / Contact">
            <Contact />
          </ScrollTimelineItem>
        </section>
      </main>
      ) : null}

      <footer className="footer-note"></footer>
    </div>
  );
}
