import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const certifications = [
  {
    category: 'Trading',
    title: 'FundingPips Evaluation Stage',
    image: '/images/fundingpips-certificate.png',
    pdf: '/certificates/fundingpips-certificate.pdf',
  },
  {
    category: 'Development',
    title: 'Professional Development Training',
    image: '/images/rabiile.jpg',
    pdf: '/certificates/dedaal-certificate.pdf',
  },
];

const duplicatedCerts = [...certifications, ...certifications];
const categories = ['All', ...new Set(certifications.map((cert) => cert.category))];

const Mentorship = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');
  const [scrollX, setScrollX] = useState(0);

  const filteredCerts = filter === 'All'
    ? duplicatedCerts
    : duplicatedCerts.filter((cert) => cert.category === filter);

  const scrollLeft = () => setScrollX((prev) => prev + 300);
  const scrollRight = () => setScrollX((prev) => prev - 300);

  return (
    <section id="mentorship" className="bg-gray-100 dark:bg-gray-900 py-16 px-6 text-center overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Mentorship Program Info Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Barnaamijka Mentorship-ka
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Barnaamijkeena 12-ka bilood ee Mentorship wuxuu kaa caawinayaa inaad noqoto Full Stack Developer xirfad leh, adigoo si toos ah ula socda mentor ku hadlaya afkaaga hooyo.
          </p>
          <ul className="text-left text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-8 space-y-3">
            <li>✅ Tababar toos ah oo lala yeesho mentor</li>
            <li>✅ Mashaariic dhab ah si aad u dhisto portfolio</li>
            <li>✅ Fursado shaqo iyo internship kadib barnaamijka</li>
            <li>✅ La socod joogto ah iyo feedback</li>
          </ul>
          <a
  href="https://t.me/rejocommunity"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Ku biir barnaamijka mentorship-ka"
  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-300 inline-block"
>
  Ku Biir Barnaamijka
</a>
        </div>

        {/* Certificates Section */}
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Professional Certifications 
        </h2>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                filter === cat
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-6 w-max transition-transform duration-500 ease-in-out"
            animate={{ x: scrollX }}
          >
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative min-w-[300px] max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(cert.image)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-3 left-3">
                  <a
                    href={cert.pdf}
                    download
                    className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded shadow-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
            <button
              onClick={scrollLeft}
              className="bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:bg-yellow-500 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
            <button
              onClick={scrollRight}
              className="bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:bg-yellow-500 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoomed Certificate"
            className="max-w-4xl max-h-[90vh] rounded-lg shadow-xl"
          />
        </div>
      )}
    </section>
  );
};

export default Mentorship;
