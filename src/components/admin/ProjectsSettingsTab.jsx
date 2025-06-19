import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsSettingsTab = ({ portfolioData, updatePortfolioData, addProject, updateProject, deleteProject }) => {
  const handleProjectImageUpload = (projectId, field, event) => {
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

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Layout
                </label>
                <select
                  value={project.layout}
                  onChange={(e) => updateProject(project.id, 'layout', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="imageRight">Image Right, Text Left</option>
                  <option value="imageLeft">Image Left, Text Right</option>
                  <option value="imageCenter">Image Center, Text Below</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image Aspect Ratio
                </label>
                <select
                  value={project.imageAspectRatio || '16/9'}
                  onChange={(e) => updateProject(project.id, 'imageAspectRatio', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="16/9">16:9 (Widescreen)</option>
                  <option value="4/3">4:3 (Standard)</option>
                  <option value="1/1">1:1 (Square)</option>
                  <option value="3/4">3:4 (Portrait)</option>
                  <option value="9/16">9:16 (Tall Portrait)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProjectImageUpload(project.id, 'image', e)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Action Image (e.g., View Icon)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProjectImageUpload(project.id, 'actionImage', e)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSettingsTab;