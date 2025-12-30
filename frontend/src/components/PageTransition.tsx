import React from 'react';
import { motion } from 'framer-motion';

// C'est ici qu'on définit l'animation "Style Vidéo 3D"
const animations = {
  initial: { opacity: 0, scale: 0.9, y: 20 }, // La page arrive un peu petite et d'en bas
  animate: { opacity: 1, scale: 1, y: 0 },    // Elle prend sa place normale
  exit: { opacity: 0, scale: 1.1, filter: "blur(10px)" } // Elle part en grossissant et en devenant floue (Effet cinématique)
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }} // Courbe de vitesse très fluide
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;