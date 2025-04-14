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
  const [selectedVideo, setSelectedVideo] = useState(null);
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

        {/* Mentorship Program Info */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-[length:300%_300%] animate-gradient-move drop-shadow-md dark:drop-shadow-lg mb-6 transition-all duration-500 ease-in-out hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] cursor-pointer">
            Barnaamijka Mentorship-ka
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Barnaajikeena 3-bilood laha ee Mentorship wuxuu kaa caawinayaa inaad noqoto Trader xirfad leh, adigoo si toos ah ula socda mentor ku hadlaya afkaaga hooyo.
          </p>

          <ul className="text-left text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-8 space-y-3">
            <li>✅ Tababar toos ah oo lala yeesho mentor-ka | screen share with zooms </li>
            <li>✅ Live trades + signals si aad u dhisto aragtida aad ka haysatid khasaaraha iyo faa idada suuqan </li>
            <li>✅ Fursado helitaan acounts probfirms ah in lagula baasiyo phase 1 iyo phase 2</li>
            <li>✅ La socod joogto ah iyo feedback</li>
          </ul>

          {/* CTA Button */}
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <a
              href="https://t.me/rejocomunnity"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-300 inline-block"
            >
              Ku Biir Barnaamijka
            </a>

            <button
               onClick={() => setSelectedVideo('https://www.youtube.com/embed/vYeTSsQHYcc?start=7')}
               className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-300"
                >
          Daawo Video-ga Hordhaca
</button>

          </div>
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

        {/* Testimonial CTA 1 */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">"I became a skilled trader in just 3 months!"</h3>
          <p className="mb-4">- Ahmed, A professional Forex trader who turned his passion into a full-time career with our mentorship program.</p>
          <a
            href="https://t.me/rejocomunnity"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-800 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-yellow-600 transition duration-300 inline-block"
          >
            Join Now and Start Your Journey
          </a>
        </div>

        {/* Testimonial CTA 2 */}
        <div className="mt-16 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">"Live trading and signals changed the way I see the market."</h3>
          <p className="mb-4">- Fatima, After joining the mentorship, I gained confidence in my trades and significantly improved my profitability.</p>
          <a
            href="https://t.me/rejocomunnity"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-800 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-green-600 transition duration-300 inline-block"
          >
            Join Us and Learn from the Best
          </a>
        </div>

        {/* Testimonial CTA 3 */}
        <div className="mt-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">"The mentorship was eye-opening, I now trade with a system."</h3>
          <p className="mb-4">- Yusuf, The mentorship program helped me create a trading system that consistently brings profits.</p>
          <a
            href="https://t.me/rejocomunnity"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-800 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-purple-600 transition duration-300 inline-block"
          >
            Start Your Trading Success Today
          </a>
        </div>

      </div>

      {/* Image Modal */}
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

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-[90%] max-w-3xl aspect-video">
            <iframe
              src={selectedVideo}
              title="Mentorship Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl shadow-2xl"
            ></iframe>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2 shadow-md hover:bg-red-600 hover:text-white transition"
            >
              ❌
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default Mentorship;
