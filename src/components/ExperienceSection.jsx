
import React from 'react';
import { motion } from 'framer-motion';

const ExperienceSection = ({ experiences, yearRatio, theme }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="experience" className="py-20 lg:ml-64 section-bg-1">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl lg:text-6xl font-bold mb-6"
            style={{ color: theme.primaryColor }}
          >
            Experience
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full progress-line mb-8"
          />
          <p 
            className="text-xl opacity-80 max-w-2xl mx-auto"
            style={{ color: theme.highValue }}
          >
            My professional journey and creative evolution over the years.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="flex flex-col md:flex-row items-start md:items-center glass-effect p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <div className="flex-grow mb-4 md:mb-0 md:mr-6">
                <h3 
                  className="text-2xl font-bold mb-1"
                  style={{ color: theme.primaryColor }}
                >
                  {exp.title}
                </h3>
                <p 
                  className="text-lg font-medium opacity-80 mb-1"
                  style={{ color: theme.highValue }}
                >
                  {exp.company}
                </p>
                <p 
                  className="text-sm opacity-70 mb-2"
                  style={{ color: theme.highValue }}
                >
                  {exp.period}
                </p>
                <p 
                  className="text-base leading-relaxed opacity-90"
                  style={{ color: theme.highValue }}
                >
                  {exp.description}
                </p>
              </div>
              
              <div className="flex items-center w-full md:w-auto mt-auto md:mt-0">
                <div 
                  className="h-3 rounded-l-full"
                  style={{ 
                    width: `${Math.max(exp.duration * yearRatio, 10)}px`, 
                    backgroundColor: theme.secondaryColor,
                    minWidth: '10px'
                  }}
                />
                <div 
                  className="w-5 h-5 rounded-full border-2"
                  style={{ 
                    backgroundColor: theme.lowValue,
                    borderColor: theme.secondaryColor,
                    marginLeft: '-2px' 
                  }}
                />
                 <span 
                    className="text-xs opacity-70 ml-2"
                    style={{ color: theme.highValue }}
                  >
                    {exp.duration} year{exp.duration !== 1 ? 's' : ''}
                  </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p 
            className="text-sm opacity-60"
            style={{ color: theme.highValue }}
          >
            Timeline scale: Each segment represents duration based on {yearRatio}px/year.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
