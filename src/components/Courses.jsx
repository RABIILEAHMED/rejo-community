import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaPalette, FaMoneyBillWave } from 'react-icons/fa';
import Register from '../pages/Register';

const courses = [
  {
    title: 'Full Stack Web Development',
    description: 'Baro HTML, CSS, JavaScript, React & Node.js adigoo af-Soomaali ku baranaya.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: <FaCode className="text-white text-lg" />, iconBg: 'bg-blue-500',
    price: '$30',
    curriculum: [],
    comingSoon: true
  },
  {
    title: 'Professional Forex Trading',
    description: 'Barashada suuqa Forex iyo sida loo sameeyo ganacsi guuleed oo waara.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: <FaMoneyBillWave className="text-white text-lg" />, iconBg: 'bg-yellow-500',
    price: '$0',
    curriculum: [
      'Market Mapping Key concepts', 'Liquidity Pools key concepts', 'Timeframe Usage 4H -15M',
      'Institutional Order flow', 'Assian Highs & Lows strategy', 'London Kill Zone Strategy',
      'Acummulaiton , Manipulation, Distrabution', 'Risk Management in Trading'
    ],
    comingSoon: false
  },
  {
    title: 'UI/UX Design Basics',
    description: 'Ku baro sida loo sameeyo design interface wanaagsan oo user-friendly ah.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: <FaPalette className="text-white text-lg" />, iconBg: 'bg-purple-500',
    price: '$49.99',
    curriculum: [],
    comingSoon: true
  }
];

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setModalMessage('');
  };

  const openRegisterModal = (course) => {
    if (course.comingSoon) {
      setModalMessage('Course kan wali waxa ku socda shaqo');
      setSelectedCourse(course);
      setIsModalOpen(true);
    } else {
      setIsRegisterModalOpen(true);
    }
  };

  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <section id="courses" className="relative py-20 px-4 bg-light dark:bg-dark transition-colors duration-500 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12 z-10"
      >
        <span className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] dark:drop-shadow-[0_0_12px_rgba(255,255,0,0.4)]">
          Our Premium Courses
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="block h-1 w-24 mt-3 mx-auto bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full origin-left shadow-md shadow-yellow-400/50 dark:shadow-pink-500/40"
        />
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-md overflow-hidden relative"
          >
            <div className="relative">
              <motion.img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className={`absolute top-4 right-4 w-10 h-10 rounded-full ${course.iconBg} flex items-center justify-center shadow-lg`}>
                {course.icon}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-dark2 mb-2">
                {course.description}
              </p>
              <p className="text-gray-800 dark:text-white font-semibold mb-4">
                Price: <span className={course.price === 'Free' ? 'text-green-500' : 'text-yellow-500'}>{course.price}</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal(course)}
                className="bg-primary hover:bg-yellow-600 text-white font-medium px-3 py-1.5 rounded-md text-sm mr-4"
              >
                View Details
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openRegisterModal(course)}
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1.5 rounded-md text-sm"
              >
                Enroll
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Course Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white dark:bg-[#2a2a2a] rounded-xl p-6 max-w-2xl w-full shadow-2xl"
            >
              {modalMessage ? (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    {modalMessage}
                  </h3>
                  <button
                    disabled
                    className="bg-gray-400 text-white font-semibold py-2 px-4 rounded cursor-not-allowed"
                  >
                    Telegram
                  </button>
                </div>
              ) : (<>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {selectedCourse.title}
                  </h3>
                  <p className="text-gray-600 dark:text-dark2 mb-2">
                    {selectedCourse.description}
                  </p>
                  <p className="text-gray-800 dark:text-white font-semibold mb-6">
                    Price: <span className={selectedCourse.price === 'Free' ? 'text-green-500' : 'text-yellow-500'}>{selectedCourse.price}</span>
                  </p>

                  <div className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    <h4>Course Curriculum:</h4>
                    <ul className="list-decimal pl-5 space-y-2">
                      {selectedCourse.curriculum.map((section, index) => (
                        <li key={index} className="text-gray-800 dark:text-white">
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              <div className="flex justify-end mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeModal}
                  className="bg-primary hover:bg-yellow-600 text-white font-medium px-4 py-1.5 rounded-md text-sm"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {isRegisterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white dark:bg-[#2a2a2a] rounded-xl p-6 w-full max-w-lg shadow-2xl relative"
            >
              <button
                onClick={closeRegisterModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl"
              >
                ✕
              </button>
              <Register onClose={closeRegisterModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Courses;
