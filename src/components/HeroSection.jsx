
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ data, theme }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      
      setMousePosition({ x, y });
      
      if (data.characterImages && data.characterImages.length > 0) {
        const imageIndex = Math.floor((x / 100) * data.characterImages.length);
        setCurrentImageIndex(Math.min(imageIndex, data.characterImages.length - 1));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [data.characterImages]);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden hero-pattern flex items-center">
      {data.backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
          style={{ backgroundImage: `url(${data.backgroundImage})` }}
        />
      )}

      <div className="lg:ml-64 w-full flex items-center justify-center relative px-6 lg:px-12 z-10">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left lg:order-1"
          >
            <div>
              <motion.h1
                className="text-5xl lg:text-7xl font-bold mb-4"
                style={{ color: theme.secondaryColor }} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {data.name}
              </motion.h1>
              <motion.p
                className="text-2xl lg:text-3xl"
                style={{ color: theme.highValue }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {data.title}
              </motion.p>
            </div>

            <motion.div
              className="w-24 h-1 progress-line rounded-full mx-auto lg:mx-0"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />

            <motion.p
              className="text-lg opacity-80 max-w-md mx-auto lg:mx-0"
              style={{ color: theme.highValue }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.8 }}
            >
              {data.tagline}
            </motion.p>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center lg:h-[70vh] h-[50vh] lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-3/5 max-w-sm h-full z-10 overflow-hidden rounded-lg">
              {data.redStripImage ? (
                <img
                  src={data.redStripImage}
                  alt="Red decorative strip background"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full"
                  style={{ backgroundColor: theme.primaryColor, opacity: 0.8 }}
                />
              )}
            </div>
            
            <motion.div
              className="relative z-20 w-full h-full flex items-center justify-center"
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x - 50) * 0.05}deg) rotateX(${(mousePosition.y - 50) * -0.02}deg) translateZ(20px)`
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {data.characterImages && data.characterImages.length > 0 ? (
                <img
                  src={data.characterImages[currentImageIndex]}
                  alt="Character"
                  className="max-w-full max-h-[80%] object-contain drop-shadow-2xl"
                />
              ) : (
                <img  
                  alt="Main character illustration"
                  className="max-w-full max-h-[80%] object-contain drop-shadow-2xl"
                 src="https://images.unsplash.com/photo-1653756223371-7dd0687680c6" />
              )}
            </motion.div>

            <motion.div
              className="absolute top-[10%] right-[10%] w-4 h-4 rounded-full z-30"
              style={{ backgroundColor: theme.secondaryColor }}
              animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-[15%] left-[15%] w-6 h-6 rounded-full z-30"
              style={{ backgroundColor: theme.primaryColor, opacity: 0.6 }}
              animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: theme.primaryColor }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 rounded-full mt-2"
            style={{ backgroundColor: theme.primaryColor }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
