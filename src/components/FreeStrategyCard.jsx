import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FreeStrategyCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const strategy = {
    name: "Rejo Model 1",
    winRate: "87%",
    videoId: "WxsyeNhtzhQ",
    startTime: 77,
    telegramLink: "https://t.me/yourTelegramLink", // beddel halkan
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${strategy.videoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${strategy.videoId}?start=${strategy.startTime}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-10 text-center max-w-3xl mx-auto border border-yellow-400"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-600 mb-6">📊 Free Compelete Strategy</h2>

        {/* Thumbnail with play icon */}
        <div
          className="relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:scale-105 transition"
          onClick={openModal}
        >
          <img src={thumbnailUrl} alt="Strategy Thumbnail" className="w-full h-auto rounded-xl" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white text-5xl">▶️</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="text-left text-gray-800 dark:text-gray-200 text-lg space-y-4 mt-6">
          <p><span className="font-semibold text-yellow-700">Magaca Strategy-ga:</span> {strategy.name}</p>
          <p><span className="font-semibold text-yellow-700">Win Ratio:</span> {strategy.winRate}</p>
        </div>

        {/* Telegram Button */}
        {/* <a
          href={strategy.telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-lg"
        >
          🚀 Hadii Aad Diyaar U Tahay Ila Trade-garayso – Telegram
        </a> */}
      </motion.div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full relative overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-sm z-10"
            >
              ✖
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FreeStrategyCard;
