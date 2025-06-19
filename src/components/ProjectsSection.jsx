import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const ProjectsSection = ({ projects, theme, setIsNavVisible }) => {
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    setIsNavVisible(!isInView);
  }, [isInView, setIsNavVisible]);

  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sectionScale = useTransform(sectionScrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const sectionOpacity = useTransform(sectionScrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);


  const getLayoutClasses = (layout) => {
    switch (layout) {
      case 'imageRight':
        return 'lg:grid-cols-2 lg:gap-12';
      case 'imageCenter':
        return 'lg:grid-cols-1 text-center';
      case 'imageLeft':
        return 'lg:grid-cols-2 lg:gap-12';
      default:
        return 'lg:grid-cols-2 lg:gap-12';
    }
  };

  const ProjectItem = ({ project, index }) => {
    const itemRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: itemRef,
      offset: ["start end", "end center"]
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
    const imageY = useTransform(scrollYProgress, [0, 1], [50, 0]);
    const textScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const textY = useTransform(scrollYProgress, [0, 1], [80, 0]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const layoutClasses = getLayoutClasses(project.layout);
    const textOrder = project.layout === 'imageLeft' ? 'lg:order-2' : 'lg:order-1';
    const imageOrder = project.layout === 'imageLeft' ? 'lg:order-1' : 'lg:order-2';
    
    const handleActionImageClick = () => {
      toast({
        title: '🚧 Feature Not Implemented',
        description: "Viewing project details isn't implemented yet—but you can request it! 🚀",
      });
    };

    return (
      <motion.div
        ref={itemRef}
        className={`grid ${layoutClasses} items-center gap-8`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <motion.div 
          className={`space-y-6 ${textOrder} ${project.layout === 'imageCenter' ? 'max-w-2xl mx-auto mt-8 lg:mt-0' : ''} order-1`}
          style={{ scale: textScale, y: textY, opacity: textOpacity }}
        >
          <div>
            <h3 
              className={`text-3xl lg:text-4xl font-bold mb-4 ${project.layout === 'imageCenter' ? 'mx-auto' : ''}`}
              style={{ color: theme.primaryColor }}
            >
              {project.title}
            </h3>
            <div 
              className={`w-16 h-1 rounded-full progress-line mb-6 ${project.layout === 'imageCenter' ? 'mx-auto' : ''}`}
            />
          </div>
          
          <p 
            className="text-lg leading-relaxed opacity-90"
            style={{ color: theme.highValue }}
          >
            {project.description}
          </p>
          {project.actionImage && (
            <motion.div 
              className={`mt-6 ${project.layout === 'imageCenter' ? 'mx-auto' : ''} w-32 h-10 cursor-pointer`}
              whileHover={{ scale: 1.1 }}
              onClick={handleActionImageClick}
            >
              <img  
                src={project.actionImage} 
                alt={`${project.title} action icon`} 
                className="w-full h-full object-contain"
               src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
            </motion.div>
          )}
        </motion.div>
        
        <motion.div
          className={`relative ${imageOrder} ${project.layout === 'imageCenter' ? 'max-w-2xl mx-auto' : ''} order-2`}
          style={{ scale: imageScale, y: imageY }}
        >
          <div 
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            style={{ aspectRatio: project.imageAspectRatio || '16/9' }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <img  
                alt={`${project.title} project showcase`}
                className="w-full h-full object-cover"
               src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
            )}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:ml-0 section-bg-2 min-h-screen">
      <motion.div
        style={{ scale: sectionScale, opacity: sectionOpacity }}
        className="max-w-6xl mx-auto px-6 lg:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <h2 
            className="text-4xl lg:text-6xl font-bold mb-6"
            style={{ color: theme.primaryColor }}
          >
            Projects
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full progress-line mb-8"
          />
          <p 
            className="text-xl opacity-80 max-w-2xl mx-auto"
            style={{ color: theme.highValue }}
          >
            Explore my creative journey through these carefully crafted projects
          </p>
        </motion.div>

        <div className="space-y-32 lg:space-y-48">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex space-x-2">
            {projects.map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.primaryColor }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;