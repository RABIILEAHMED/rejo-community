import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaPalette, FaMoneyBillWave } from 'react-icons/fa';

const courses = [
  {
    title: 'Full Stack Web Development',
    description: 'Baro HTML, CSS, JavaScript, React & Node.js adigoo af-Soomaali ku baranaya.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: <FaCode className="text-white text-lg" />,
    iconBg: 'bg-blue-500',
    price: '$30',
    curriculum: [],
    comingSoon: true
  },
  {
    title: 'Professional Forex Trading',
    description: 'Barashada suuqa Forex iyo sida loo sameeyo ganacsi guuleed oo waara.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: <FaMoneyBillWave className="text-white text-lg" />,
    iconBg: 'bg-yellow-500',
    price: '$0',
    curriculum: [
      'Market Mapping Key concepts',
      'Liquidity Pools key concepts',
      'Timeframe Usage 4H -15M',
      'Institutional Order flow',
      'Assian Highs & Lows strategy',
      'London Kill Zone Strategy',
      'Acummulaiton , Manipulation, Distrabution',
      'Risk Management in Trading'
    ],
    comingSoon: false
  },
  {
    title: 'One to One Coaching',
    description: 'One to One Coaching - Ku baro design user interface leh oo xirfadaysan, adigoo helaya hagid toos ah.',
    image: "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <FaPalette className="text-white text-lg" />,
    iconBg: 'bg-purple-500',
    price: '$49.99',
    curriculum: [
      'Fahamka UI/UX: Maxay yihiin?',
      'Tools: Figma, Adobe XD',
      'Wireframing & Prototyping',
      'Design Principles & Best Practices',
      'Color Theory & Typography',
      'Mobile vs Desktop Design',
      'User Testing & Feedback',
      'Portfolio Setup & Mentorship Guidance'
    ],
    comingSoon: false
  }
];

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const openDetailsModal = (course) => {
    setSelectedCourse(course);
    setModalMessage('');
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setModalMessage('');
  };

  const openEnrollModal = (course) => {
    if (course.title === 'Professional Forex Trading') {
      // Telegram link for Professional Forex Trading enroll
      window.open('https://t.me/rejocommunity', '_blank'); // <-- Update your Telegram link here
      return;
    }

    if (course.title === 'UI/UX Design Basics') {
      window.open('https://wa.me/252634734075', '_blank');
      return;
    }

    if (course.title === 'One to One Coaching') {
      window.open(
        'https://wa.me/252634734075?text=Waan%20salaamanahay!%20Waxaan%20xiiseynayaa%20inaan%20iska%20diiwaangeliyo%20%22One%20to%20One%20Coaching%22.%20Fadlan%20iiga%20soo%20jawaab.',
        '_blank'
      );
      return;
    }

    if (course.comingSoon) {
      setSelectedCourse(course);
      setModalMessage('Course kan wali waxa ku socda shaqo');
      setIsModalOpen(true);
    } else {
      setSelectedCourse(course);
      setIsEnrollModalOpen(true);
    }
  };

  const closeEnrollModal = () => {
    setIsEnrollModalOpen(false);
    setSelectedCourse(null);
  };

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
            className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-md overflow-hidden relative cursor-pointer
              border-2 border-transparent
              hover:border-yellow-400
              transition-all duration-300
              "
          >
            {/* Animated glow border on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: '0 0 15px 3px rgba(252, 211, 77, 0.8)', // yellow glow
                borderRadius: '12px'
              }}
            />

            <div className="relative">
              <motion.img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className={`absolute top-4 right-4 w-10 h-10 rounded-full ${course.iconBg} flex items-center justify-center shadow-lg`}>
                {course.icon}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 relative inline-block">
                {course.title}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                />
              </h3>
              <p className="text-gray-600 dark:text-dark2 mb-2">
                {course.description}
              </p>
              <p className="text-gray-800 dark:text-white font-semibold mb-4">
                Price: <span className={course.price === 'Free' ? 'text-green-500' : 'text-yellow-500'}>{course.price}</span>
              </p>
              <div className="flex">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openDetailsModal(course)}
                  className="bg-primary hover:bg-yellow-600 text-white font-medium px-3 py-1.5 rounded-md text-sm mr-3"
                >
                  View Details
                </motion.button>

                <motion.button
                  whileHover={{ scale: course.comingSoon ? 1 : 1.05 }}
                  whileTap={{ scale: course.comingSoon ? 1 : 0.95 }}
                  onClick={() => openEnrollModal(course)}
                  className={`font-medium px-3 py-1.5 rounded-md text-sm ${
                    course.comingSoon
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : course.title === 'UI/UX Design Basics'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                  }`}
                  disabled={course.comingSoon}
                >
                  Enroll
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
                <div className="text-center text-gray-800 dark:text-white text-lg font-semibold">
                  {modalMessage}
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">{selectedCourse.title}</h3>
                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                    {selectedCourse.curriculum.length === 0 ? (
                      <li>No curriculum available.</li>
                    ) : (
                      selectedCourse.curriculum.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))
                    )}
                  </ul>
                  <button
                    onClick={() => setIsEnrollModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md mr-4"
                  >
                    Enroll Now
                  </button>
                  <button
                    onClick={closeDetailsModal}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md"
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}

        {isEnrollModalOpen && selectedCourse && (
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
              className="bg-white dark:bg-[#2a2a2a] rounded-xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-4 dark:text-white">
                You have enrolled in "{selectedCourse.title}"!
              </h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Thank you for enrolling. Check your Telegram for further details.
              </p>
              <button
                onClick={closeEnrollModal}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Courses;
