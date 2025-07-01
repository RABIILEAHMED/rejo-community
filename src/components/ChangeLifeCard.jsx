import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChangeLifeCard = () => {
  const navigate = useNavigate();

  const messages = [
    "Halkan waxaan kugu soo uruuriyey muuqaalo iyo talooyin kaa caawinaya inaad noqoto qofka ugu fiican ee aad noqon karto hadii aad dabaqdo saaxiib.",
    "Isbeddelka noloshaadu wuxuu bilaabmaa markaad go'aan qaadato. Ha sugin!"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentMessage = messages[currentMessageIndex];

    if (charIndex < currentMessage.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(typingTimeout);
    }

    const switchTimeout = setTimeout(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      setDisplayText('');
      setCharIndex(0);
    }, 5000);

    return () => clearTimeout(switchTimeout);
  }, [charIndex, currentMessageIndex, messages, isPaused]);

  const goToChangeLife = () => {
    navigate('/changeyourlife');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative mt-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl p-6 md:p-10 text-white text-center max-w-4xl mx-auto overflow-hidden"
    >
      {/* Ribbon Top Left */}
      <div className="absolute top-0 left-0 bg-red-600 text-white text-xs md:text-sm px-3 py-1 rounded-br-2xl font-bold shadow-lg z-10">
        ✨ Isbeddel muuqda 3 bilood gudahood!
      </div>

      {/* Ribbon Bottom Right – Always visible */}
      <div className="absolute bottom-0 right-0 bg-green-600 text-white text-xs md:text-sm px-3 py-1 rounded-tl-2xl font-bold shadow-lg z-10">
        🚀 Maanta nala bilow is badal ka
      </div>

      {/* Animated Icon */}
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="text-5xl mb-4"
      >
        💥
      </motion.div>

      <h3 className="text-2xl md:text-4xl font-extrabold mb-4">Life Changing Lessons</h3>

      {/* Typing Animation Text with pause on hover */}
      <p
        className="text-lg md:text-2xl leading-relaxed h-28 md:h-24 mb-10 whitespace-pre-line font-medium md:font-semibold cursor-default"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {displayText}
      </p>

      <button
        onClick={goToChangeLife}
        className="mb-4 bg-white text-yellow-700 font-bold px-6 py-3 rounded-full shadow-md hover:bg-yellow-100 transition duration-300 text-base md:text-lg z-20 relative"
      >
        💥 Ku Dhiirro
      </button>
    </motion.div>
  );
};

export default ChangeLifeCard;
