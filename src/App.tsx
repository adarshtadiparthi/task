// Import necessary dependencies from React and components
import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';

// Main App component
const App: React.FC = () => {
  // State to track dark/light mode
  const [darkMode, setDarkMode] = useState(false);

  // Effect to handle dark mode class on document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    // Main container with dark mode responsive classes
    <div className="min-h-screen transition-colors duration-200
                    dark:bg-gray-900 dark:text-white">
      {/* Navigation bar */}
      <nav className="bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            E-commerce Catalog
          </h1>
          {/* Dark mode toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                     dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {darkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {/* Product list component */}
      <ProductList />
    </div>
  );
};

export default App;