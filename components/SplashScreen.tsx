"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SplashScreenProps {
  visible: boolean;
  onSkip: () => void;
}

export default function SplashScreen({ visible, onSkip }: SplashScreenProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="splash-screen__halo"
            initial={{ scale: 0.84, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="splash-screen__content"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="splash-screen__eyebrow">Creative Motion Studio</p>
            <h1 className="splash-screen__title">
              <span>Vision</span>
              <span>of Akash</span>
            </h1>
            <p className="splash-screen__subtitle">All Gujarat Service Available</p>
            <p className="splash-screen__meta">Stories, shoots, reels and edits that reveal themselves as you scroll.</p>

            <motion.div
              className="splash-screen__ticker"
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span />
              <span>Loading Timeline Experience</span>
            </motion.div>

            <button type="button" className="splash-screen__skip" onClick={onSkip}>
              Skip Intro
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}