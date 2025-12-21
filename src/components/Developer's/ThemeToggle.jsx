import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react';


const ThemeToggle = () => {
  // Initialize theme state from localStorage or default to 'system'
  const [theme, setTheme] = useState(() => {
    // Check localStorage first when component mounts
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'system';
    }
    return 'system';
  });

  // Function to set theme in both state and localStorage
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Effect to apply the theme class to the HTML element
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    // Remove any existing theme classes
    htmlElement.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      // Use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlElement.classList.add(systemPrefersDark ? 'dark' : 'light');
    } else {
      // Apply user preference
      htmlElement.classList.add(theme);
    }
  }, [theme]);

  // Add listener for system theme changes when using 'system' setting
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Handler function to update theme when system preference changes
      const handleSystemThemeChange = (e) => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(e.matches ? 'dark' : 'light');
      };
      
      // Add listener and call it immediately to set initial value
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      // Cleanup function to remove listener
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
      {/* Light Theme Button */}
      <button
        onClick={() => handleThemeChange('light')}
        className={`p-2 rounded-md ${
          theme === 'light' 
            ? 'bg-white text-yellow-500 shadow-sm' 
            : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        aria-label="Light theme"
      >
        <SunIcon className="w-5 h-5" />
      </button>

      {/* Dark Theme Button */}
      <button
        onClick={() => handleThemeChange('dark')}
        className={`p-2 rounded-md ${
          theme === 'dark' 
            ? 'bg-gray-700 text-blue-400 shadow-sm' 
            : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        aria-label="Dark theme"
      >
        <MoonIcon className="w-5 h-5" />
      </button>

      {/* System Theme Button */}
      <button
        onClick={() => handleThemeChange('system')}
        className={`p-2 rounded-md ${
          theme === 'system' 
            ? 'bg-white dark:bg-gray-700 text-purple-500 shadow-sm' 
            : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        aria-label="System theme"
      >
        <MonitorIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ThemeToggle;