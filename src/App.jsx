import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import AdminPanel from '@/components/AdminPanel';

function App() {
  const { toast } = useToast();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved ? JSON.parse(saved) : {
      isDark: false,
      primaryColor: '#dc2626',
      secondaryColor: '#16a34a',
      highValue: '#374151',
      lowValue: '#ffffff'
    };
  });

  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolio-data');
    const defaultData = {
      hero: {
        name: 'Muhammad Haider',
        title: 'Creative Portfolio',
        tagline: 'Creative professional specializing in innovative design solutions and artistic excellence.',
        characterImages: [],
        backgroundImage: '',
        redStripImage: ''
      },
      projects: [
        {
          id: 1,
          title: 'Project One',
          description: 'Amazing project description here',
          image: '',
          actionImage: '',
          imageAspectRatio: '16/9', 
          layout: 'imageRight'
        },
        {
          id: 2,
          title: 'Project Two',
          description: 'Another fantastic project',
          image: '',
          actionImage: '',
          imageAspectRatio: '4/3',
          layout: 'imageCenter'
        }
      ],
      experiences: [
        {
          id: 1,
          title: 'Senior Designer',
          company: 'Creative Studio',
          period: '2020-2023',
          description: 'Led creative projects and team collaboration',
          duration: 3 
        },
        {
          id: 2,
          title: 'Junior Designer',
          company: 'Design Agency',
          period: '2018-2020',
          description: 'Developed design skills and portfolio',
          duration: 2
        },
        {
          id: 3,
          title: 'Freelance Illustrator',
          company: 'Self-Employed',
          period: '2017-2018',
          description: 'Worked on various illustration projects for clients.',
          duration: 1
        },
        {
          id: 4,
          title: 'Design Intern',
          company: 'Startup Inc.',
          period: '2016-2017',
          description: 'Assisted senior designers and learned industry tools.',
          duration: 1
        },
        {
          id: 5,
          title: 'Graphic Design Student',
          company: 'Art University',
          period: '2012-2016',
          description: 'Completed B.A. in Graphic Design.',
          duration: 4
        }
      ],
      contact: {
        email: 'muhammad.haider@example.com',
        linkedin: 'https://linkedin.com/in/muhammad-haider',
        artstation: 'https://artstation.com/muhammad-haider',
        phone: '+1 (555) 123-4567'
      },
      yearRatio: 20 
    };
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure new fields have defaults if loading old data
      parsed.hero = { ...defaultData.hero, ...parsed.hero };
      parsed.projects = parsed.projects.map(p => ({ ...defaultData.projects[0], ...p }));
      parsed.experiences = parsed.experiences.map(e => ({ ...defaultData.experiences[0], ...e }));
      parsed.yearRatio = parsed.yearRatio || defaultData.yearRatio;
      return parsed;
    }
    return defaultData;
  });

  useEffect(() => {
    const root = document.documentElement;
    const colors = theme.isDark ? {
      highValue: theme.lowValue,
      lowValue: theme.highValue
    } : {
      highValue: theme.highValue,
      lowValue: theme.lowValue
    };

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const primaryRgb = hexToRgb(theme.primaryColor);
    const secondaryRgb = hexToRgb(theme.secondaryColor);
    const highValueRgb = hexToRgb(colors.highValue);
    const lowValueRgb = hexToRgb(colors.lowValue);

    if (primaryRgb) root.style.setProperty('--primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
    if (secondaryRgb) root.style.setProperty('--secondary-rgb', `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`);
    if (highValueRgb) root.style.setProperty('--high-value-rgb', `${highValueRgb.r}, ${highValueRgb.g}, ${highValueRgb.b}`);
    if (lowValueRgb) root.style.setProperty('--low-value-rgb', `${lowValueRgb.r}, ${lowValueRgb.g}, ${lowValueRgb.b}`);

    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--high-value', colors.highValue);
    root.style.setProperty('--low-value', colors.lowValue);

    if (theme.isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('portfolio-theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio-data', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const updateTheme = (newTheme) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  const updatePortfolioData = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{portfolioData.hero.name} - Creative Portfolio</title>
        <meta name="description" content={portfolioData.hero.tagline} />
      </Helmet>

      <div className="min-h-screen relative custom-scrollbar">
        <AnimatePresence>
          {isNavVisible && (
            <Navigation 
              portfolioData={portfolioData}
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
              scrollToSection={scrollToSection}
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsAdminOpen(true)}
          className="fixed top-4 right-4 z-[60] p-3 glass-effect rounded-full hover:bg-red-500/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings className="w-5 h-5" style={{ color: theme.primaryColor }} />
        </motion.button>

        <main className="relative">
          <HeroSection 
            data={portfolioData.hero}
            theme={theme}
          />
          
          <ProjectsSection 
            projects={portfolioData.projects}
            theme={theme}
            setIsNavVisible={setIsNavVisible}
          />
          
          <ExperienceSection 
            experiences={portfolioData.experiences}
            yearRatio={portfolioData.yearRatio}
            theme={theme}
          />
          
          <ContactSection 
            contact={portfolioData.contact}
            theme={theme}
          />
        </main>

        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          theme={theme}
          updateTheme={updateTheme}
          portfolioData={portfolioData}
          updatePortfolioData={updatePortfolioData}
        />

        <Toaster />
      </div>
    </>
  );
}

export default App;