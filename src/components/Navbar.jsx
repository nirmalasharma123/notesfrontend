import React, { useState } from 'react';

const Navbar = ({ darkMode, toggleDarkMode, handleLogout }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-10 p-2 bg-gray-800 text-white bg-opacity-90 rounded-b-lg shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold">Notes App</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
