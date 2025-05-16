import React, { useState, useEffect } from 'react';
import { FaBell, FaDiscord, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Dark mode default ON
  const [newMessage, setNewMessage] = useState(false);
  const [messageClicked, setMessageClicked] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);

    // Show toast 5 seconds after mount
    const toastTimer = setTimeout(() => {
      setShowToast(true);
    }, 5000);

    return () => clearTimeout(toastTimer);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setMessageClicked(true);
    // Here you can also trigger modal if you want
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <nav
        className={`bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center ${
          scrolling ? 'fixed top-0 left-0 w-full z-50' : 'relative'
        }`}
      >
        <h1
          className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer"
          onClick={() => navigate('/')}
        >
          Rejo <span className="text-yellow-500">Community</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300 font-medium items-center">
          <li><a href="#home" className="hover:text-yellow-500">Home</a></li>
          <li><a href="#courses" className="hover:text-yellow-500">Courses</a></li>
          <li><a href="#mentorship" className="hover:text-yellow-500">Mentorship</a></li>
          <li><a href="#pdfbooks" className="hover:text-yellow-500">PDF Books</a></li>
        </ul>

        {/* Social + Controls */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4 text-xl text-gray-700 dark:text-gray-300">
            <a href="https://discord.com/invite/zPNzf7wYC6" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <FaDiscord />
            </a>
            <a href="https://t.me/rejocommunity" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <FaTelegramPlane />
            </a>
            <a href="https://www.youtube.com/@rejocommunity" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <FaYoutube />
            </a>
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="text-xl dark:text-white" aria-label="Toggle dark mode">
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button onClick={handleClick} className="text-xl text-gray-800 dark:text-white" aria-label="Notifications">
              <FaBell />
            </button>
            {newMessage && !messageClicked && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center animate-pulse">
                !
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 right-0 bg-white dark:bg-gray-800 shadow-lg w-full px-6 py-4 md:hidden z-40">
            <ul className="space-y-4 text-gray-700 dark:text-gray-200 font-medium">
              <li><a href="#home" className="hover:text-yellow-500" onClick={() => setIsOpen(false)}>Home</a></li>
              <li><a href="#courses" className="hover:text-yellow-500" onClick={() => setIsOpen(false)}>Courses</a></li>
              <li><a href="#mentorship" className="hover:text-yellow-500" onClick={() => setIsOpen(false)}>Mentorship</a></li>
              <li><a href="#pdfbooks" className="hover:text-yellow-500" onClick={() => setIsOpen(false)}>PDF Books</a></li>
            </ul>

            <div className="flex justify-center mt-4 space-x-6 text-xl text-gray-700 dark:text-gray-300">
              <a href="https://discord.com/invite/zPNzf7wYC6" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaDiscord />
              </a>
              <a href="https://t.me/rejocommunity" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaTelegramPlane />
              </a>
              <a href="https://www.youtube.com/@rejocommunity" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaYoutube />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-4 z-50">
          <span>Xirfaduhu waa furaha kalsoonidaada nololeed</span>
          <button onClick={closeToast} aria-label="Close toast" className="font-bold hover:text-gray-900">
            X
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
