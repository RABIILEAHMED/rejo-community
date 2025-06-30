import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileImage from "../assets/profile.jpg";
import messageSound from "../assets/message.wav"; // ✅ Codka

const WelcomeModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [triggered, setTriggered] = useState(false); // ✅ In modal hal mar kaliya furmo session-kaan

  useEffect(() => {
    const handleUserAction = () => {
      if (!triggered) {
        setShowModal(true);
        playSound(); // ✅ ciyaar codka
        setTriggered(true); // si aan modal kale uusan u furmin ilaa refresh la sameeyo
        removeListeners();
      }
    };

    const addListeners = () => {
      window.addEventListener("scroll", handleUserAction);
      window.addEventListener("click", handleUserAction);
    };

    const removeListeners = () => {
      window.removeEventListener("scroll", handleUserAction);
      window.removeEventListener("click", handleUserAction);
    };

    addListeners();

    return () => removeListeners();
  }, [triggered]);

  // ✅ Function codka u ciyaaraya
  const playSound = () => {
    const audio = new Audio(messageSound);
    audio.play().catch((error) => {
      console.warn("Codka lama ciyaari karo:", error);
    });
  };

  const closeModal = () => setShowModal(false);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full text-center shadow-xl relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            <div className="flex flex-col items-center space-y-4">
              <img
                src={profileImage}
                alt="Rabiile Ahmed"
                className="w-20 h-20 rounded-full border-4 border-green-500 shadow-lg object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Saaxiib, Soo Dhawoow!
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Waxaan ahay <span className="font-medium text-blue-600 dark:text-blue-400">Rabiile Ahmed</span>.  
                Haddii aad rabto in aynu si gaar ah u saaxiibno, fadlan guji hoos!
              </p>
              <a
                href="https://wa.me/252634734075"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
              >
                La xidhiidh Rabiile 
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
