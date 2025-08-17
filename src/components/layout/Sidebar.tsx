import React from 'react';
import { clsx } from 'clsx';
import { SETUP_CATEGORIES } from '../../utils/constants';
import { useUIStore } from '../../stores/uiStore';

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useUIStore();

  return (
    <aside className="w-64">
      <div className="sticky top-4 mx-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Setup Categories
        </h2>
        
        <nav className="space-y-2">
          {SETUP_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200',
                activeTab === category.id
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <span className="text-lg" role="img" aria-label={category.name}>
                {category.icon}
              </span>
              <span className="text-sm font-medium">
                {category.name}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;