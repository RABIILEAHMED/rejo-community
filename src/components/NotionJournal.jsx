import React from "react";
import { FaDownload, FaEdit, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const NotionJournal = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#f1f5f9] to-white dark:from-[#0f172a] dark:to-[#1e293b] transition-colors duration-500">
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
          Qorshee ganacsigaaga si nidaamsan adigoo la soconaya entries, profits, mistakes iyo horumarkaaga. Journal-kan wuxuu kaa caawinayaa inaad si maskax leh u noqoto ganacsade xirfad leh.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://cute-marquis-4a9.notion.site/Rejocommunity-Trading-Journal-207aafea943b804c8d81ec2ffcf68a2c?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2"
          >
            <FaDownload /> Download Template
          </a>
          <a
            href="https://cute-marquis-4a9.notion.site/Rejocommunity-Trading-Journal-207aafea943b804c8d81ec2ffcf68a2c?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2"
          >
            <FaEdit /> Open in Notion
          </a>
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
              <span><strong>Step 1:</strong> Guji "Download Template" si aad u duplicate-gareyso journal-kaaga gaarka ah (Notion account lagama maarmaan).</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span><strong>Step 2:</strong> Maalin kasta geli ganacsiyadaada: Entry, Direction, TP/SL, sababta aad u gashay iyo natiijada.</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span><strong>Step 3:</strong> Isticmaal column-ka "Mindset Notes" si aad u ogaatid fikirkaaga iyo cabsidaada.</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              <span><strong>Step 4:</strong> Todobaad walba samee falanqayn: Guulaha, khaladaadka, iyo casharada aad baratay.</span>
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
    </section>
  );
};

export default NotionJournal;
