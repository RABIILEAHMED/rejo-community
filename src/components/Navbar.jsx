import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [newMessage, setNewMessage] = useState(false); // State to handle new message notification
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [messageClicked, setMessageClicked] = useState(false); // State to handle if message is clicked
  const [scrolling, setScrolling] = useState(false); // State to track scrolling

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);

    const timer = setTimeout(() => {
      setNewMessage(true);
    }, 5000); // Simulate a new message

    return () => clearTimeout(timer); // Clear timer when component unmounts
  }, [darkMode]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true); // Mark navbar as fixed after 50px scroll
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    // Do nothing for now, prevent message from opening automatically
  };

  const handleMouseLeave = () => {
    // Do nothing for now, prevent message from closing automatically
  };

  const handleClick = () => {
    setMessageClicked(true);
    setShowModal(true); // Only show the modal when clicked
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


      <div className="flex items-center space-x-3">
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl dark:text-white">
          {darkMode ? '☀️' : '🌙'}
        </button>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-white dark:bg-gray-800 shadow-lg w-full px-6 py-4 md:hidden">
          <ul className="space-y-4 text-gray-700 dark:text-gray-200 font-medium">
  <li><a href="#home" className="hover:text-yellow-500">Home</a></li>
  <li><a href="#courses" className="hover:text-yellow-500">Courses</a></li>
  <li><a href="#mentorship" className="hover:text-yellow-500">Mentorship</a></li>
  <li><a href="#pdfbooks" className="hover:text-yellow-500">PDF Books</a></li>
</ul>

        </div>
      )}

      {showModal && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg w-80 z-50">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">New Message</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">caawa waxa jira meeting ku saabsan alipay! Check it out.</p>
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
