
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Image, Settings as SettingsIcon, Users, Mail, Sliders, Shield, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

import AdminSidebar from '@/components/admin/AdminSidebar';
import ThemeSettingsTab from '@/components/admin/ThemeSettingsTab';
import HeroSettingsTab from '@/components/admin/HeroSettingsTab';
import ProjectsSettingsTab from '@/components/admin/ProjectsSettingsTab';
import ExperienceSettingsTab from '@/components/admin/ExperienceSettingsTab';
import ContactSettingsTab from '@/components/admin/ContactSettingsTab';
import PortfolioSettingsTab from '@/components/admin/PortfolioSettingsTab';
import UserManagementTab from '@/components/admin/UserManagementTab';
import ResetConfirmationModal from '@/components/admin/ResetConfirmationModal';
import { v4 as uuidv4 } from 'uuid';

const AdminPanel = ({ isOpen, onClose, onLogout, theme, updateTheme, portfolioData, updatePortfolioData }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('theme');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const tabs = [
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'hero', label: 'Hero', icon: Image },
    { id: 'projects', label: 'Projects', icon: SettingsIcon },
    { id: 'experience', label: 'Experience', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'userManagement', label: 'User Management', icon: Shield},
    { id: 'settings', label: 'Portfolio', icon: Sliders },
  ];

  const handleColorChange = (colorType, value) => {
    updateTheme({ [colorType]: value });
  };

  const handleThemeToggle = () => {
    updateTheme({ isDark: !theme.isDark });
  };

  const handleImageUpload = (section, field, event, projectId = null, elementId = null) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
  
    const processFile = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (section === 'hero' && field === 'characterImages') {
          updatePortfolioData('hero', {
            ...portfolioData.hero,
            characterImages: [...(portfolioData.hero.characterImages || []), e.target.result]
          });
        } else if (section === 'projects' && field === 'elements' && projectId && elementId) {
          const updatedProjects = portfolioData.projects.map(p => {
            if (p.id === projectId) {
              return {
                ...p,
                elements: p.elements.map(el => 
                  el.id === elementId ? { ...el, src: e.target.result, type: 'image' } : el
                )
              };
            }
            return p;
          });
          updatePortfolioData('projects', updatedProjects);
        }
         else {
          updatePortfolioData(section, {
            ...portfolioData[section],
            [field]: e.target.result
          });
        }
        toast({
          title: "Image uploaded successfully!",
          description: `${file.name} has been added.`,
        });
      };
      reader.readAsDataURL(file);
    };
  
    if ((section === 'hero' && field === 'characterImages') || (section === 'projects' && field === 'elements' && files.length > 1)) {
      Array.from(files).forEach(processFile);
    } else {
      processFile(files[0]);
    }
  };
  
  const addProject = () => {
    const newProject = {
      id: uuidv4(),
      title: 'New Project',
      description: 'Project description',
      image: '',
      actionImage: '',
      imageAspectRatio: '16/9',
      layout: 'imageRight',
      elements: []
    };
    updatePortfolioData('projects', [...portfolioData.projects, newProject]);
    toast({
      title: "Project added!",
      description: "A new project has been added to your portfolio.",
    });
  };

  const updateProject = (projectId, field, value) => {
    const updatedProjects = portfolioData.projects.map(project =>
      project.id === projectId ? { ...project, [field]: value } : project
    );
    updatePortfolioData('projects', updatedProjects);
  };

  const deleteProject = (projectId) => {
    const updatedProjects = portfolioData.projects.filter(project => project.id !== projectId);
    updatePortfolioData('projects', updatedProjects);
    toast({
      title: "Project deleted!",
      description: "The project has been removed from your portfolio.",
    });
  };

  const addExperience = () => {
    const newExperience = {
      id: uuidv4(),
      title: 'New Position',
      company: 'Company Name',
      period: '2023-2024',
      description: 'Job description',
      duration: 1
    };
    updatePortfolioData('experiences', [...portfolioData.experiences, newExperience]);
    toast({
      title: "Experience added!",
      description: "A new experience has been added to your timeline.",
    });
  };

  const updateExperience = (expId, field, value) => {
    const updatedExperiences = portfolioData.experiences.map(exp =>
      exp.id === expId ? { ...exp, [field]: value } : exp
    );
    updatePortfolioData('experiences', updatedExperiences);
  };

  const deleteExperience = (expId) => {
    const updatedExperiences = portfolioData.experiences.filter(exp => exp.id !== expId);
    updatePortfolioData('experiences', updatedExperiences);
    toast({
      title: "Experience deleted!",
      description: "The experience has been removed from your timeline.",
    });
  };

  const saveChanges = () => {
    toast({
      title: "Changes saved!",
      description: "All your portfolio changes have been saved successfully.",
    });
    onClose(); 
  };

  const handleResetData = () => {
    localStorage.removeItem('portfolio-theme');
    localStorage.removeItem('portfolio-data');
    setShowResetConfirm(false);
    toast({
      title: "Data Reset!",
      description: "Portfolio data has been reset. Reloading...",
    });
    setTimeout(() => window.location.reload(), 1500);
  };

  if (!isOpen) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'theme':
        return <ThemeSettingsTab theme={theme} handleColorChange={handleColorChange} handleThemeToggle={handleThemeToggle} />;
      case 'hero':
        return <HeroSettingsTab portfolioData={portfolioData} updatePortfolioData={updatePortfolioData} handleImageUpload={handleImageUpload} />;
      case 'projects':
        return <ProjectsSettingsTab portfolioData={portfolioData} updatePortfolioData={updatePortfolioData} addProject={addProject} updateProject={updateProject} deleteProject={deleteProject} handleImageUpload={handleImageUpload} theme={theme} />;
      case 'experience':
        return <ExperienceSettingsTab portfolioData={portfolioData} updatePortfolioData={updatePortfolioData} addExperience={addExperience} updateExperience={updateExperience} deleteExperience={deleteExperience} />;
      case 'contact':
        return <ContactSettingsTab portfolioData={portfolioData} updatePortfolioData={updatePortfolioData} />;
      case 'userManagement':
        return <UserManagementTab portfolioData={portfolioData} updatePortfolioData={updatePortfolioData} />;
      case 'settings':
        return <PortfolioSettingsTab theme={theme} portfolioData={portfolioData} updateTheme={updateTheme} updatePortfolioData={updatePortfolioData} setShowResetConfirm={setShowResetConfirm} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <AdminSidebar 
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onClose={onClose}
            onSaveChanges={saveChanges}
            onLogout={onLogout}
          />
          
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
            {renderActiveTab()}
          </div>
        </motion.div>

        {showResetConfirm && (
          <ResetConfirmationModal 
            onConfirm={handleResetData}
            onCancel={() => setShowResetConfirm(false)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;
