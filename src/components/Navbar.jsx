import React, { useState, useEffect } from 'react';
import { FaBell, FaDiscord, FaTelegramPlane, FaYoutube, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [newMessage, setNewMessage] = useState(true);
  const [messageClicked, setMessageClicked] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    const toastTimer = setTimeout(() => setShowToast(true), 5000);
    return () => clearTimeout(toastTimer);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotificationClick = () => {
    setMessageClicked(true);
    setNewMessage(false);
    navigate('/');
    setIsOpen(false);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center transition-all duration-300 ${
          scrolling ? 'fixed top-0 left-0 w-full z-50' : 'relative'
        }`}
      >
        {/* Brand */}
        <h1
          className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer"
          onClick={() => {
            navigate('/');
            setIsOpen(false);
          }}
        >
          Rejo <span className="text-yellow-500">Community</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300 font-medium items-center">
          {location.pathname === '/' ? (
            <>
              <li><button onClick={() => scrollToSection('home')} className="hover:text-yellow-500">Home</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-yellow-500">Courses</button></li>
              <li><button onClick={() => scrollToSection('mentorship')} className="hover:text-yellow-500">Mentorship</button></li>
              <li><button onClick={() => scrollToSection('pdfbooks')} className="hover:text-yellow-500">PDF Books</button></li>
            </>
          ) : (
            <li><button onClick={() => navigate('/')} className="hover:text-yellow-500">Home</button></li>
          )}
          <li><button onClick={() => navigate('/changeyourlife')} className="hover:text-yellow-500">Change Your Life</button></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Desktop Icons */}
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

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="text-xl text-gray-800 dark:text-white"
              aria-label="Notifications"
            >
              <FaBell />
            </button>
            {newMessage && !messageClicked && (
              <span className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 text-xs rounded-full flex items-center justify-center animate-pulse">!</span>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800 dark:text-white" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 right-0 bg-white dark:bg-gray-800 shadow-lg w-full px-6 py-4 md:hidden z-40">
            <ul className="space-y-4 text-gray-700 dark:text-gray-200 font-medium">
              {location.pathname === '/' ? (
                <>
                  <li><button onClick={() => scrollToSection('home')} className="hover:text-yellow-500">Home</button></li>
                  <li><button onClick={() => scrollToSection('courses')} className="hover:text-yellow-500">Courses</button></li>
                  <li><button onClick={() => scrollToSection('mentorship')} className="hover:text-yellow-500">Mentorship</button></li>
                  <li><button onClick={() => scrollToSection('pdfbooks')} className="hover:text-yellow-500">PDF Books</button></li>
                </>
              ) : (
                <li><button onClick={() => { navigate('/'); setIsOpen(false); }} className="hover:text-yellow-500">Home</button></li>
              )}
              <li>
                <button
                  onClick={() => {
                    navigate('/changeyourlife');
                    setIsOpen(false);
                  }}
                  className="hover:text-yellow-500"
                >
                  Change Your Life
                </button>
              </li>
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

      {/* Floating WhatsApp Call Me Button */}
      <a
        href="https://wa.me/252634734075?text=Asc%2C%20waxaan%20rabay%20inan%20la%20soo%20xariiro"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-bounce transition-all duration-300"
        title="Call me on WhatsApp"
      >
        <FaPhoneAlt className="text-xl" />
        <span className="font-semibold">Call Me</span>
      </a>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-4 z-50">
          <span>Xirfaduhu waa furaha kalsoonidaada nololeed</span>
          <button onClick={closeToast} className="font-bold hover:text-gray-900">X</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
