import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, Type, Settings2, SlidersHorizontal, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import ProjectsSection from '@/components/ProjectsSection'; // For live preview

const defaultElementSettings = {
  id: '',
  type: 'text', // 'text' or 'image'
  content: 'New Text Element', // For text
  src: '', // For images
  position: { x: 50, y: 50 }, // 0-100 for left/top percentage
  size: { width: 30, height: 'auto' }, // width as % of container, height auto or %
  presetPosition: 'center-center', // e.g., 'top-left', 'center-center', 'bottom-right'
};

const ElementEditor = ({ element, projectId, updateProjectElement, deleteProjectElement, handleImageUpload }) => {
  const [localElement, setLocalElement] = useState(element);

  const handleChange = (field, value, subField = null) => {
    let newElement;
    if (subField) {
      newElement = { ...localElement, [field]: { ...localElement[field], [subField]: value } };
    } else {
      newElement = { ...localElement, [field]: value };
    }
    setLocalElement(newElement);
    updateProjectElement(projectId, element.id, newElement);
  };

  const commonInputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 text-sm";
  const sliderClass = "w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-red-500 [&::-moz-range-thumb]:bg-red-500";


  const applyPreset = (preset) => {
    let newPos = { ...localElement.position };
    switch(preset) {
      case 'top-left': newPos = { x: 0, y: 0 }; break;
      case 'top-center': newPos = { x: 50, y: 0 }; break;
      case 'top-right': newPos = { x: 100, y: 0 }; break;
      case 'center-left': newPos = { x: 0, y: 50 }; break;
      case 'center-center': newPos = { x: 50, y: 50 }; break;
      case 'center-right': newPos = { x: 100, y: 50 }; break;
      case 'bottom-left': newPos = { x: 0, y: 100 }; break;
      case 'bottom-center': newPos = { x: 50, y: 100 }; break;
      case 'bottom-right': newPos = { x: 100, y: 100 }; break;
      default: break;
    }
    handleChange('position', newPos);
    handleChange('presetPosition', preset);
  };

  const presetButtons = [
    'top-left', 'top-center', 'top-right',
    'center-left', 'center-center', 'center-right',
    'bottom-left', 'bottom-center', 'bottom-right',
  ];

  return (
    <div className="p-4 mb-3 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 bg-gray-50 dark:bg-gray-800/50">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
          {element.type} Element
        </span>
        <button
          onClick={() => deleteProjectElement(projectId, element.id)}
          className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {element.type === 'text' && (
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Content</label>
          <textarea
            value={localElement.content}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={3}
            className={commonInputClass}
          />
        </div>
      )}

      {element.type === 'image' && (
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            className={`${commonInputClass} file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100`}
            onChange={(e) => handleImageUpload('projects', 'elements', e, projectId, element.id)}
          />
          {localElement.src && <img src={localElement.src} alt="Element preview" className="mt-2 w-24 h-16 object-cover rounded" />}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Position X: {localElement.position.x}%</label>
          <input type="range" min="0" max="100" value={localElement.position.x} onChange={(e) => handleChange('position', parseInt(e.target.value), 'x')} className={sliderClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Position Y: {localElement.position.y}%</label>
          <input type="range" min="0" max="100" value={localElement.position.y} onChange={(e) => handleChange('position', parseInt(e.target.value), 'y')} className={sliderClass} />
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Preset Positions</label>
        <div className="grid grid-cols-3 gap-1">
          {presetButtons.map(preset => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className={`p-1.5 text-xs rounded ${localElement.presetPosition === preset ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              {preset.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Width: {localElement.size.width}%</label>
            <input type="range" min="10" max="100" value={localElement.size.width} onChange={(e) => handleChange('size', parseInt(e.target.value), 'width')} className={sliderClass} />
        </div>
        {element.type === 'image' && (
             <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Height</label>
                <select value={localElement.size.height} onChange={(e) => handleChange('size', e.target.value, 'height')} className={commonInputClass}>
                    <option value="auto">Auto</option>
                    <option value="100%">Fill Container</option>
                </select>
            </div>
        )}
      </div>
    </div>
  );
};


const ProjectsSettingsTab = ({ portfolioData, updatePortfolioData, addProject, updateProject, deleteProject, handleImageUpload, theme }) => {
  const { toast } = useToast();

  const addProjectElement = (projectId, type) => {
    const newElement = { ...defaultElementSettings, id: uuidv4(), type, content: type === 'text' ? 'New Text' : '' };
    const project = portfolioData.projects.find(p => p.id === projectId);
    if(project) {
        const updatedElements = [...(project.elements || []), newElement];
        updateProject(projectId, 'elements', updatedElements);
    }
  };

  const updateProjectElement = (projectId, elementId, updates) => {
    const project = portfolioData.projects.find(p => p.id === projectId);
    if(project) {
        const updatedElements = project.elements.map(el => 
            el.id === elementId ? { ...el, ...updates } : el
        );
        updateProject(projectId, 'elements', updatedElements);
    }
  };

  const deleteProjectElement = (projectId, elementId) => {
    const project = portfolioData.projects.find(p => p.id === projectId);
    if(project) {
        const updatedElements = project.elements.filter(el => el.id !== elementId);
        updateProject(projectId, 'elements', updatedElements);
    }
  };

  const handleProjectImageFieldUpload = (projectId, field, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProject(projectId, field, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {portfolioData.projects.map((project) => (
          <div key={project.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Project: {project.title || `ID ${project.id}`}
              </h4>
              <button
                onClick={() => deleteProject(project.id)}
                className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text" value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Layout</label>
                <select
                  value={project.layout}
                  onChange={(e) => updateProject(project.id, 'layout', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="imageRight">Image Right, Text Left</option>
                  <option value="imageLeft">Image Left, Text Right</option>
                  <option value="imageCenter">Image Center, Text Below</option>
                  <option value="custom">Custom Elements</option>
                </select>
              </div>
              {project.layout !== 'custom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Main Image Aspect Ratio</label>
                    <select
                      value={project.imageAspectRatio || '16/9'}
                      onChange={(e) => updateProject(project.id, 'imageAspectRatio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="16/9">16:9</option> <option value="4/3">4:3</option> <option value="1/1">1:1</option> <option value="3/4">3:4</option> <option value="9/16">9:16</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Main Project Image</label>
                    <input type="file" accept="image/*" onChange={(e) => handleProjectImageFieldUpload(project.id, 'image', e)} 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action Image (View Icon)</label>
                <input type="file" accept="image/*" onChange={(e) => handleProjectImageFieldUpload(project.id, 'actionImage', e)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
              </div>
            </div>
            
            {project.layout === 'custom' && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h5 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Custom Layout Elements</h5>
                <div className="flex space-x-2 mb-4">
                  <button onClick={() => addProjectElement(project.id, 'text')} className="flex items-center text-xs space-x-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"><Type size={14}/><span>Text</span></button>
                  <button onClick={() => addProjectElement(project.id, 'image')} className="flex items-center text-xs space-x-1 px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600"><ImageIcon size={14}/><span>Image</span></button>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                  {project.elements && project.elements.map((element) => (
                    <ElementEditor 
                      key={element.id} 
                      element={element} 
                      projectId={project.id}
                      updateProjectElement={updateProjectElement}
                      deleteProjectElement={deleteProjectElement}
                      handleImageUpload={handleImageUpload}
                    />
                  ))}
                  {(!project.elements || project.elements.length === 0) && <p className="text-sm text-center text-gray-400 dark:text-gray-500 py-4">Add elements to build your custom layout.</p>}
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h5 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Live Preview</h5>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-96">
                 <div className="transform scale-[0.3] origin-top-left w-[333.33%] h-[333.33%] bg-white dark:bg-gray-900 p-2">
                   <ProjectsSection projects={[project]} theme={theme} isPreview={true} />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSettingsTab;