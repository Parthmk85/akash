"use client"

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

interface HeroVisualsProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroVisuals({ scrollYProgress }: HeroVisualsProps) {
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const frame2Y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div className="hero-right">
      <motion.div className="hero-img-wrap layer-main" style={{ y: heroParallax }}>
        <Image 
          src="/to4.jpeg" 
          alt="Akash Portrait" 
          fill 
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }} 
          priority 
        />
      </motion.div>
      <motion.div className="hero-img-accent frame-2" style={{ y: frame2Y }}>
        <Image src="/assets/img3.jpeg" alt="Frame 2" fill style={{ objectFit: 'cover' }} />
      </motion.div>
      <div className="img-fade-left"></div>
      <div className="img-fade-bottom"></div>
    </div>
  );
}
