import React from "react";

const Register = ({ onClose }) => {
  return (
    <div className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-auto text-center">
      <h2 className="text-3xl font-bold text-yellow-500 mb-4">
        Haddaad Diyaar u Tahay 
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
        Course-kani waa mid kor u qaadi doona Xirfadaada iyo aragtida aad ka haysato suuqyadan . Wixii faahfaahin ama isdiiwaan
        gelin ah, nagala soo xiriir Telegram:
      </p>
      <a
        href="https://t.me/rejocommunity"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md text-lg transition"
      >
        Join Course on Telegram
      </a>

      <button
        onClick={onClose}
        className="block w-full mt-6 text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-500"
      >
        Cancel
      </button>
    </div>
  );
};

export default Register;
