import React from 'react';

const ContactSettingsTab = ({ portfolioData, updatePortfolioData }) => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={portfolioData.contact.email}
            onChange={(e) => updatePortfolioData('contact', { ...portfolioData.contact, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={portfolioData.contact.phone}
            onChange={(e) => updatePortfolioData('contact', { ...portfolioData.contact, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={portfolioData.contact.linkedin}
            onChange={(e) => updatePortfolioData('contact', { ...portfolioData.contact, linkedin: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ArtStation URL
          </label>
          <input
            type="url"
            value={portfolioData.contact.artstation}
            onChange={(e) => updatePortfolioData('contact', { ...portfolioData.contact, artstation: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSettingsTab;