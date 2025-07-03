import React, { useState } from "react";
import { FaDownload, FaEdit, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const NotionJournal = () => {
  const [showWarning, setShowWarning] = useState(false);

  const handleBlockedAction = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 4000);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#f1f5f9] to-white dark:from-[#0f172a] dark:to-[#1e293b] transition-colors duration-500 relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
        >
          📒 Rejocommunity Trading Journal
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10"
        >
          Qaybtan wali shaqo ayaa ka socota. Fadlan dulqaado – lama ogola in la soo dejiyo ama la duplicate-gareeyo waqtigan.
        </motion.p>

        {/* ❌ Disabled Buttons */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={handleBlockedAction}
            className="bg-gray-500 text-white px-6 py-3 rounded-full shadow-md cursor-not-allowed flex items-center gap-2 opacity-70"
          >
            <FaDownload /> Download Template
          </button>
          <button
            onClick={handleBlockedAction}
            className="bg-gray-500 text-white px-6 py-3 rounded-full shadow-md cursor-not-allowed flex items-center gap-2 opacity-70"
          >
            <FaEdit /> Open in Notion
          </button>
        </motion.div>

        {/* ✅ Guide */}
        <motion.div
          className="text-left bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Sida Loo Isticmaalo Journal-ka:</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-base">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span><strong>Tallaabo 1:</strong> Marka la furo – journal-kan wuxuu noqon doonaa read-only ilaa update-ka dhameystirmo.</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span><strong>Tallaabo 2:</strong> Markuu furan yahay – waxaa lagu arkayaa tusaale sida uu u egyahay.</span>
            </li>
          </ul>
        </motion.div>

        {/* ✅ Preview */}
        <motion.div
          className="mt-12 shadow-2xl rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <iframe
            src="https://cute-marquis-4a9.notion.site/ebd/207aafea943b804c8d81ec2ffcf68a2c"
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
            title="Rejocommunity Trading Journal Preview"
            className="w-full"
          />
        </motion.div>
      </div>

      {/* ❗ Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-md animate-bounce">
            <FaExclamationTriangle className="text-red-500 text-4xl mb-3 mx-auto" />
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Digniin</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Waqtigan xaadirka ah lama ogola in la soo dejiyo ama la duplicate-gareeyo journal-kan. Fadlan dulqaado ilaa shaqada laga dhameeyo.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default NotionJournal;
