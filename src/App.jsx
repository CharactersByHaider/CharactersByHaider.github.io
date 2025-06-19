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
import AdminLogin from '@/components/admin/AdminLogin';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const { toast } = useToast();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
    const defaultProjectElement = {
      id: uuidv4(),
      type: 'text', // 'text' or 'image'
      content: 'Editable text content here.', // For text
      src: '', // For images
      position: { x: 50, y: 50 }, // 0-100 for left/top percentage
      size: { width: 50, height: 'auto' }, // width as % of container, height auto or %
      presetPosition: 'center-center', // e.g., 'top-left', 'center-center', 'bottom-right'
    };
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
          id: uuidv4(),
          title: 'Project One',
          description: 'Amazing project description here. This is used if layout is not custom.',
          image: '', // Main project image for non-custom layouts
          actionImage: '',
          imageAspectRatio: '16/9', 
          layout: 'imageRight', // imageRight, imageLeft, imageCenter, custom
          elements: [
            {...defaultProjectElement, content: 'Project One Intro Text', position: {x:10, y:10}},
            {...defaultProjectElement, type: 'image', src: '', position: {x:60, y:30}, size:{width:30, height:'auto'}},
          ] 
        },
        {
          id: uuidv4(),
          title: 'Project Two',
          description: 'Another fantastic project. This is used if layout is not custom.',
          image: '',
          actionImage: '',
          imageAspectRatio: '4/3',
          layout: 'custom',
          elements: [
            {...defaultProjectElement, content: 'Explore the details of Project Two.', position: {x:50, y:20}, presetPosition: 'top-center'},
            {...defaultProjectElement, type: 'image', src: '', position: {x:20, y:50}, size:{width:60, height:'auto'}, presetPosition: 'center-left'},
          ]
        }
      ],
      experiences: [
        {
          id: uuidv4(),
          title: 'Senior Designer',
          company: 'Creative Studio',
          period: '2020-2023',
          description: 'Led creative projects and team collaboration',
          duration: 3 
        },
        {
          id: uuidv4(),
          title: 'Junior Designer',
          company: 'Design Agency',
          period: '2018-2020',
          description: 'Developed design skills and portfolio',
          duration: 2
        },
        {
          id: uuidv4(),
          title: 'Freelance Illustrator',
          company: 'Self-Employed',
          period: '2017-2018',
          description: 'Worked on various illustration projects for clients.',
          duration: 1
        }
      ],
      contact: {
        email: 'muhammad.haider@example.com',
        linkedin: 'https://linkedin.com/in/muhammad-haider',
        artstation: 'https://artstation.com/muhammad-haider',
        phone: '+1 (555) 123-4567'
      },
      yearRatio: 20,
      adminUsers: [
        { id: uuidv4(), username: 'haider1397', password: 'Admin' }
      ]
    };
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.hero = { ...defaultData.hero, ...parsed.hero };
      parsed.projects = parsed.projects.map(p => ({ 
        ...defaultData.projects[0], 
        id: p.id || uuidv4(), 
        elements: (p.elements || []).map(el => ({...defaultProjectElement, ...el, id: el.id || uuidv4()})), 
        ...p 
      }));
      parsed.experiences = parsed.experiences.map(e => ({ ...defaultData.experiences[0], id: e.id || uuidv4(), ...e }));
      parsed.yearRatio = parsed.yearRatio || defaultData.yearRatio;
      parsed.adminUsers = parsed.adminUsers || defaultData.adminUsers;
      parsed.adminUsers = parsed.adminUsers.map(u => ({...u, id: u.id || uuidv4()}));
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

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('portfolio-admin-auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const updateTheme = (newTheme) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  const updatePortfolioData = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleLogin = (username, password) => {
    const user = portfolioData.adminUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio-admin-auth', 'true');
      toast({ title: "Login Successful!", description: `Welcome back, ${username}!` });
      setIsAdminOpen(true);
      return true;
    }
    toast({ title: "Login Failed", description: "Invalid username or password.", variant: "destructive" });
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio-admin-auth');
    setIsAdminOpen(false);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
  };
  
  const openAdminPanel = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAdminOpen(true); 
    }
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
        <Navigation 
          portfolioData={portfolioData}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          scrollToSection={scrollToSection}
        />

        <motion.button
          onClick={openAdminPanel}
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

        {isAdminOpen && !isAuthenticated && (
           <AdminLogin onLogin={handleLogin} onClose={() => setIsAdminOpen(false)} />
        )}

        {isAdminOpen && isAuthenticated && (
          <AdminPanel
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            onLogout={handleLogout}
            theme={theme}
            updateTheme={updateTheme}
            portfolioData={portfolioData}
            updatePortfolioData={updatePortfolioData}
          />
        )}
        

        <Toaster />
      </div>
    </>
  );
}

export default App;