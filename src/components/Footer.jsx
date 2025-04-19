import React from 'react';
import { FaYoutube, FaTelegram, FaDiscord, FaLinkedin } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center"> {/* Yaraynta padding-ka footer-ka */}
      <div className="mb-2"> {/* Yaraynta margin-ka ee qeybta qoraalka */}
        <p>&copy; 2025 RejoCommunity. All Rights Reserved.</p>
      </div>
      <div className="flex justify-center space-x-6 mb-2"> {/* Yaraynta margin-ka ee icons-ka */}
        <a href="https://www.youtube.com/@rejocommunity" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
          <FaYoutube size={20} />
        </a>
        <a href="https://t.me/rejocommunity" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
          <FaTelegram size={20} />
        </a>
        <a href="https://discord.com/invite/zPNzf7wYC6" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
          <FaDiscord size={20} />
        </a>
        <a href="https://linkedin.com"target="_blank" rel="noopener noreferrer"  className="text-white hover:text-gray-300">
          <FaLinkedin size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
