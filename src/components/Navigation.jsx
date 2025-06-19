import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = ({ portfolioData, isMobileMenuOpen, toggleMobileMenu, scrollToSection }) => {
  const navItems = [
    { id: 'hero', label: portfolioData.hero.name },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact Me' }
  ];

  const navVariants = {
    visible: { opacity: 1, x: 0, y:0 },
    hidden: { opacity: 0, x: -100, y: -100 },
  };

  return (
    <>
      {/* Desktop Navigation - Left Side */}
      <motion.nav
        variants={navVariants}
        initial="visible"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.5 }}
        className="hidden lg:flex fixed left-0 top-0 h-full w-64 z-40 flex-col justify-center"
      >
        <div className="glass-effect h-full flex flex-col justify-center space-y-8 px-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left group relative overflow-hidden"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative text-lg font-medium text-gray-600 group-hover:text-red-500 transition-colors duration-300">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation - Top */}
      <motion.nav
        variants={navVariants}
        initial="visible"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.5 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-effect"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold gradient-text">
            {portfolioData.hero.name}
          </h1>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-red-500" />
            ) : (
              <Menu className="w-6 h-6 text-red-500" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-effect border-t border-red-500/20"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};

export default Navigation;