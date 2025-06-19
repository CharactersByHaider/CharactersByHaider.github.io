
import React from 'react';
import { X, Save, LogOut } from 'lucide-react';

const AdminSidebar = ({ tabs, activeTab, setActiveTab, onClose, onSaveChanges, onLogout }) => {
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <nav className="space-y-2 flex-grow">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-red-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-700 space-y-4">
        <button
          onClick={onSaveChanges}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
