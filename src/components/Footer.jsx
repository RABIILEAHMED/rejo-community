import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center"> {/* Yaraynta padding-ka footer-ka */}
      <div className="mb-2"> {/* Yaraynta margin-ka ee qeybta qoraalka */}
        <p>&copy; 2025 RejoCommunity. All Rights Reserved.</p>
      </div>
      <div className="flex justify-center space-x-6 mb-2"> {/* Yaraynta margin-ka ee icons-ka */}
        <a href="https://facebook.com" className="text-white hover:text-gray-300">
          <FaFacebook size={20} />
        </a>
        <a href="https://twitter.com" className="text-white hover:text-gray-300">
          <FaTwitter size={20} />
        </a>
        <a href="https://instagram.com" className="text-white hover:text-gray-300">
          <FaInstagram size={20} />
        </a>
        <a href="https://linkedin.com" className="text-white hover:text-gray-300">
          <FaLinkedin size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
