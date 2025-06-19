import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const ProjectElementDisplay = ({ element, theme }) => {
  const style = {
    position: 'relative', 
    left: `${element.position?.x || 50}%`,
    top: `${element.position?.y || 50}%`,
    transform: `translate(-${element.position?.x || 50}%, -${element.position?.y || 50}%)`,
    width: element.size?.width ? `${element.size.width}%` : 'auto',
    height: element.size?.height && element.size.height !== 'auto' ? `${element.size.height}%` : 'auto',
    maxWidth: '100%', 
  };

  if (element.type === 'text') {
    return (
      <div style={style}>
        <p className="text-lg leading-relaxed opacity-90" style={{ color: theme.highValue }}>
          {element.content}
        </p>
      </div>
    );
  } else if (element.type === 'image' && element.src) {
    return (
      <div style={style}>
        <img
          src={element.src}
          alt="Project content"
          className="max-w-full h-auto rounded-lg shadow-md object-contain"
          style={{ width: '100%', height: element.size?.height === 'auto' ? 'auto' : '100%'}}
        />
      </div>
    );
  }
  return null;
};


const ProjectsSection = ({ projects, theme, isPreview = false }) => {
  const { toast } = useToast();
  const sectionRef = useRef(null);
  
  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    disabled: isPreview
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
      case 'custom':
        return `relative min-h-[300px] md:min-h-[400px] ${isPreview ? 'lg:min-h-[200px]' : 'lg:min-h-[500px]'}`; 
      default:
        return 'lg:grid-cols-2 lg:gap-12';
    }
  };

  const ProjectItem = ({ project, index }) => {
    const itemRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: itemRef,
      offset: ["start end", "end center"],
      disabled: isPreview
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
    const imageY = useTransform(scrollYProgress, [0, 1], [50, 0]);
    const textScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const textY = useTransform(scrollYProgress, [0, 1], [80, 0]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const layoutClasses = getLayoutClasses(project.layout);
    let textOrder = 'lg:order-1';
    let imageOrder = 'lg:order-2';
    if (project.layout === 'imageLeft') {
        textOrder = 'lg:order-2';
        imageOrder = 'lg:order-1';
    } else if (project.layout === 'custom') {
        textOrder = ''; 
        imageOrder = '';
    }
    
    const handleActionImageClick = () => {
      if (isPreview) return;
      toast({
        title: '🚧 Feature Not Implemented',
        description: "Viewing project details isn't implemented yet—but you can request it! 🚀",
      });
    };
    
    const contentMotionProps = isPreview ? {} : { style: { scale: textScale, y: textY, opacity: textOpacity } };
    const imageMotionProps = isPreview ? {} : { style: { scale: imageScale, y: imageY } };


    if (project.layout === 'custom') {
      return (
        <motion.div
          ref={itemRef}
          className={`items-center gap-8 ${layoutClasses}`}
          initial={isPreview ? {} : { opacity: 0 }}
          animate={isPreview ? {} : { opacity: 1 }}
          transition={isPreview ? {} : { duration: 0.5, delay: index * 0.1 }}
        >
          <div className={`${isPreview ? '' : 'text-center'}`}>
            <h3 
              className={`text-3xl lg:text-4xl font-bold mb-4 ${isPreview ? 'text-sm' : ''}`}
              style={{ color: theme.primaryColor }}
            >
              {project.title}
            </h3>
            <div 
              className={`w-16 h-1 rounded-full progress-line mb-6 ${isPreview ? 'mx-auto w-8 h-0.5 mb-2' : 'mx-auto'}`}
            />
          </div>
          <div className={`relative w-full h-full ${layoutClasses}`}>
            {project.elements && project.elements.map(element => (
              <div key={element.id} className="absolute w-full h-full pointer-events-none">
                 <ProjectElementDisplay element={element} theme={theme} />
              </div>
            ))}
          </div>

          {project.actionImage && (
            <motion.div 
              className={`mt-6 ${isPreview ? 'mx-auto' : ''} w-32 h-10 cursor-pointer ${isPreview ? 'w-16 h-5' : ''}`}
              whileHover={isPreview ? {} : { scale: 1.1 }}
              onClick={handleActionImageClick}
            >
               <img  src={project.actionImage || "https://images.unsplash.com/photo-1572177812156-58036aae439c"} alt={`${project.title} action icon`} className="w-full h-full object-contain"/>
            </motion.div>
          )}
        </motion.div>
      );
    }


    return (
      <motion.div
        ref={itemRef}
        className={`grid ${layoutClasses} items-center gap-8`}
        initial={isPreview ? {} : { opacity: 0 }}
        animate={isPreview ? {} : { opacity: 1 }}
        transition={isPreview ? {} : { duration: 0.5, delay: index * 0.1 }}
      >
        <motion.div 
          className={`space-y-6 ${textOrder} ${project.layout === 'imageCenter' ? 'max-w-2xl mx-auto mt-8 lg:mt-0' : ''} order-1`}
          {...contentMotionProps}
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
              whileHover={isPreview ? {} : { scale: 1.1 }}
              onClick={handleActionImageClick}
            >
               <img  src={project.actionImage || "https://images.unsplash.com/photo-1572177812156-58036aae439c"} alt={`${project.title} action icon`} className="w-full h-full object-contain"/>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div
          className={`relative ${imageOrder} ${project.layout === 'imageCenter' ? 'max-w-2xl mx-auto' : ''} order-2`}
          {...imageMotionProps}
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
               <img  alt={`${project.title} project showcase`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1572177812156-58036aae439c"/>
            )}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    );
  };
  
  const sectionMotionProps = isPreview ? {} : { style: { scale: sectionScale, opacity: sectionOpacity } };


  return (
    <section id="projects" ref={sectionRef} className={`py-20 section-bg-2 min-h-screen ${isPreview ? '' : 'lg:ml-0'}`}>
      <motion.div
        {...sectionMotionProps}
        className="max-w-6xl mx-auto px-6 lg:px-12"
      >
        {!isPreview && (
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
        )}

        <div className={`space-y-32 lg:space-y-48 ${isPreview ? 'space-y-8 lg:space-y-8' : ''}`}>
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>

        {!isPreview && projects.length > 0 && (
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
        )}
      </motion.div>
    </section>
  );
};

export default ProjectsSection;