import React from 'react';
import { useToast } from '@/components/ui/use-toast';

const PortfolioSettingsTab = ({ theme, portfolioData, updateTheme, updatePortfolioData, setShowResetConfirm }) => {
  const { toast } = useToast();

  const handleExportData = () => {
    const dataStr = JSON.stringify({ theme, portfolioData }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: "Backup created!",
      description: "Your portfolio data has been exported.",
    });
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.theme) updateTheme(data.theme);
          if (data.portfolioData) {
            Object.keys(data.portfolioData).forEach(key => {
              updatePortfolioData(key, data.portfolioData[key]);
            });
          }
          toast({
            title: "Data imported!",
            description: "Your portfolio has been restored from backup.",
          });
        } catch (error) {
          toast({
            title: "Import failed!",
            description: "Invalid backup file format. Please ensure it's a valid JSON.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Settings</h3>
      
      <div className="space-y-6">
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Management</h4>
          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Export Portfolio Data
            </button>
            
            <div>
              <label htmlFor="import-file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Import Portfolio Data (.json)</label>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h4 className="text-lg font-medium text-red-700 dark:text-red-400 mb-4">Reset Options</h4>
          <p className="text-sm text-red-600 dark:text-red-300 mb-4">
            Warning: Resetting data will erase all your current settings and content. This action cannot be undone.
          </p>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSettingsTab;