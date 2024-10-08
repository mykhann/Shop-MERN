import React from 'react';
import { FaWhatsapp, FaTwitter, FaVoicemail, FaAddressBook, FaInstagram, FaAddressCard } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-800 to-cyan-950 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold text-red-500 transform hover:scale-105 transition-transform duration-300">
            MyStore
          </h1>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://wa.me/yourwhatsappphonenumber" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="h-6 w-6 hover:text-green-500" />
          </a>
          <a href="https://instagram.com/yourinstagramhandle" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="h-6 w-6 hover:text-green-500" />
          </a>
          <a href="https://twitter.com/yourtwitterhandle" target="_blank" rel="noopener noreferrer">
            <FaAddressCard className="h-6 w-6 hover:text-blue-400" />
          </a>
          <a 
            href="mailto:example@gmail.com" 
            className="text-lg hover:underline mb-2"
          >
            MyStore@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
