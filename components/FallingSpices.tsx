"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FallingSpices = () => {
  const [spices, setSpices] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const createSpice = () => {
      const isFireEmoji = Math.random() < 0.3; // 30% chance for fire emoji
      const emoji = isFireEmoji ? '🔥' : '🌶️';
      
      const spiceStyle: React.CSSProperties = {
        position: 'absolute',
        top: '-40px',
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 30 + 20}px`, // Increased size range
        opacity: Math.random() * 0.4 + 0.3, // Slightly increased opacity
      };

      const spice = (
        <motion.div
          key={Date.now()}
          style={spiceStyle}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: '100vh',
            rotate: isFireEmoji ? 0 : 360, // Only rotate peppers
            x: Math.random() * 150 - 75, // Increased swaying range
          }}
          transition={{
            duration: Math.random() * 15 + 10, // Slightly faster falling
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {emoji}
        </motion.div>
      );

      setSpices((prevSpices) => [...prevSpices, spice]);
    };

    // Create initial batch of spices
    for (let i = 0; i < 8; i++) { // Increased initial batch
      createSpice();
    }

    const interval = setInterval(createSpice, 2000); // Increased frequency

    return () => clearInterval(interval);
  }, []);

  return <div className="fixed inset-0 pointer-events-none">{spices}</div>;
};

export default FallingSpices;