import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center px-4">
      <Helmet>
        <title>RejoCommunity – Barashada Tech-ka Af-Soomaali</title>
        <meta name="description" content="Baro Full Stack Development, AI, Python & UI/UX Design adigoo Af-Soomaali ku baranaya." />
        <meta name="keywords" content="RejoCommunity, Full Stack Somali, Web Development Afsoomaali, Courses Somali" />
        <meta property="og:title" content="RejoCommunity" />
        <meta property="og:description" content="Baro tech-ka casriga ah af-Soomaali!" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1950&q=80" />
      </Helmet>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      <div className="relative z-10 max-w-4xl text-white">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ku Baro <span className="text-yellow-400">Barnaamijyada Casriga ah</span> Af-Soomaali
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-8 text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Horumari xirfadahaaga sida Web Development, AI, iyo Full Stack si aad u gaarto xirfad sare.
        </motion.p>
        <motion.button
  onClick={() => window.open('https://t.me/rejocommunity', '_blank')}
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.8 }}
>
  Ku Biir Hadda
</motion.button>

      </div>
    </section>
  );
};

export default Hero;
