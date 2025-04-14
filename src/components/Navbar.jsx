import React, { useState, useEffect } from 'react';
import { FaBell, FaDiscord, FaTelegramPlane, FaYoutube } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageClicked, setMessageClicked] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);

    // Show the "new message" after 5 seconds when the page is loaded or refreshed
    const timer = setTimeout(() => {
      setNewMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Show the modal when the page is first loaded or refreshed
    setShowModal(true);
  }, []);

  const handleClick = () => {
    setMessageClicked(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMessageClicked(false);
  };

  return (
    <nav
      className={`bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center ${
        scrolling ? 'fixed top-0 left-0 w-full z-50' : 'relative'
      }`}
    >
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Rejo <span className="text-yellow-500">Community</span>
      </h1>

      <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300 font-medium">
        <li><a href="#home" className="hover:text-yellow-500">Home</a></li>
        <li><a href="#courses" className="hover:text-yellow-500">Courses</a></li>
        <li><a href="#mentorship" className="hover:text-yellow-500">Mentorship</a></li>
        <li><a href="#pdfbooks" className="hover:text-yellow-500">PDF Books</a></li>
      </ul>

      <div className="flex items-center space-x-4">
        {/* Desktop Social Icons */}
        <div className="hidden md:flex space-x-4 text-xl text-gray-700 dark:text-gray-300">
          <a href="https://discord.com/invite/zPNzf7wYC6" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
            <FaDiscord />
          </a>
          <a href="https://t.me/rejocomunnity" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
            <FaTelegramPlane />
          </a>
          <a href="https://www.youtube.com/@rejocommunity" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
            <FaYoutube />
          </a>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="text-xl dark:text-white">
          {darkMode ? '☀️' : '🌙'}
        </button>

        <div className="relative">
          <button className="text-xl text-gray-800 dark:text-white" onClick={handleClick}>
            <FaBell />
          </button>
          {newMessage && !messageClicked && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center animate-pulse">
              !
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-white dark:bg-gray-800 shadow-lg w-full px-6 py-4 md:hidden z-40">
          <ul className="space-y-4 text-gray-700 dark:text-gray-200 font-medium">
            <li><a href="#home" className="hover:text-yellow-500">Home</a></li>
            <li><a href="#courses" className="hover:text-yellow-500">Courses</a></li>
            <li><a href="#mentorship" className="hover:text-yellow-500">Mentorship</a></li>
            <li><a href="#pdfbooks" className="hover:text-yellow-500">PDF Books</a></li>
          </ul>

          {/* Mobile Social Icons */}
          <div className="flex justify-center mt-4 space-x-6 text-xl text-gray-700 dark:text-gray-300">
            <a href="https://discord.com/invite/zPNzf7wYC6" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <FaDiscord />
            </a>
            <a href="https://t.me/rejocomunnity" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <FaTelegramPlane />
            </a>
            <a href="https://www.youtube.com/@rejocommunity" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <FaYoutube />
            </a>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg w-80 z-50">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">New Message</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">"The platform is still under construction and implementation. ⚠️"</p>
          <button
            onClick={handleCloseModal}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-400"
          >
            Close
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
