import React, { useEffect, useState } from 'react';

import type { TabItem, TabsProps, TabVariant } from './tabs.props';

const Tabs: React.FC<TabsProps & { value?: number }> = ({
  tabs,
  defaultTab = 0,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  contentClassName = '',
  variant = 'default',
  fullWidth = false,
  onTabChange,
  value,
}) => {
  const [activeTab, setActiveTab] = useState<number>(defaultTab);

  useEffect(() => {
    if (value !== undefined && value !== activeTab) {
      setActiveTab(value);
    }
  }, [value]);

  const currentTab = value !== undefined ? value : activeTab;

  const baseTabStyles: Record<TabVariant, string> = {
    default: 'px-4 py-2 font-medium text-sm transition-colors duration-200 border-b-2',
    pills: 'px-4 py-2 font-medium text-sm transition-colors duration-200 rounded-lg',
    underline: 'px-4 py-2 font-medium text-sm transition-all duration-300 ease-in-out border-b-2 bg-gray-50',
  };

  const activeTabStyles: Record<TabVariant, string> = {
    default: 'text-primary-600 border-primary-600',
    pills: 'bg-primary-600 text-white',
    underline: 'text-black font-bold border-b-2 border-secondary-600',
  };

  const inactiveTabStyles: Record<TabVariant, string> = {
    default: 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
    pills: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
    underline: 'text-gray-500 hover:text-gray-700 hover:bg-gray-200',
  };

  const handleTabClick = (index: number): void => {
    if (tabs[index]?.disabled) return;

    if (value === undefined) {
      setActiveTab(index);
    }
    onTabChange?.(index);
  };

  const tabWidthClass = fullWidth ? 'flex-1' : '';

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex ${variant === 'pills' ? 'space-x-1 bg-neutral-50 p-1 rounded-lg' : variant === 'underline' ? 'bg-neutral-50' : 'border-b border-gray-200'}`}>
        {tabs.map((tab: TabItem, index: number) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`
              flex
              justify-center
              ${baseTabStyles[variant]}
              ${currentTab === index ? `${activeTabStyles[variant]} ${activeTabClassName}` : `${inactiveTabStyles[variant]}`}
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${tabWidthClass}
              ${tabClassName}
            `}
            disabled={tab.disabled}
            type="button"
            role="tab"
            aria-selected={currentTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
          >
            {tab.icon && <span className="px-1">{tab.icon}</span>}
            {tab.label}
            {tab.badge && <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">{tab.badge}</span>}
          </button>
        ))}
      </div>

      <div className={`${contentClassName}`} role="tabpanel" id={`tabpanel-${currentTab}`} aria-labelledby={`tab-${currentTab}`}>
        {tabs[currentTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
