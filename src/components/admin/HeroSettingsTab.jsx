
import React from 'react';

const HeroSettingsTab = ({ portfolioData, updatePortfolioData, handleImageUpload }) => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Section</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={portfolioData.hero.name}
              onChange={(e) => updatePortfolioData('hero', { ...portfolioData.hero, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={portfolioData.hero.title}
              onChange={(e) => updatePortfolioData('hero', { ...portfolioData.hero, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tagline / Subtitle
            </label>
            <textarea
              value={portfolioData.hero.tagline}
              onChange={(e) => updatePortfolioData('hero', { ...portfolioData.hero, tagline: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Background Image (PC & Mobile)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload('hero', 'backgroundImage', e)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended aspect ratio: 16:9 for PC, 9:16 for Mobile.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Red Strip Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload('hero', 'redStripImage', e)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Character Images (3D Effect)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload('hero', 'characterImages', e)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Upload multiple images for 3D mouse interaction effect. Ensure consistent dimensions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSettingsTab;
