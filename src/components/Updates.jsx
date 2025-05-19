import React from 'react';
import { FaCheckCircle, FaVideo, FaBook } from 'react-icons/fa';

const Updates = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        🎬 Cutubka 2aad – Precision Entries
      </h1>

      <p className="mb-4">
        👋 Ku soo dhawoow Qeybta 2aad ee koorsadeenna Forex – <strong>Precision Entries!</strong>
      </p>
      <p className="mb-6">
        Qeybtan waxaa diiradda lagu saarayaa entry-ga saxda ah ee leh win-rate sare, iyadoo lagu
        adeegsanayo xeelado cad, shuruudo la xaqiijiyay, iyo faham qoto dheer oo suuqa ah.
      </p>

      <ul className="space-y-4 border-l-4 border-yellow-500 pl-4">
        <li>
          <FaCheckCircle className="inline text-yellow-500 mr-2" />
          <strong>Asian High/Low & Liquidity Sweeps</strong> – Baro sida suuqa u qaato liquidity-ga Asia ka hor inta aan move-ka weyn bilaaban.
        </li>
        <li>
          <FaCheckCircle className="inline text-yellow-500 mr-2" />
          <strong>Power of Three</strong> – Faham sida institutional money u sameeyo saddex-geesoodka dhaqaaqa suuqa.
        </li>
        <li>
          <FaCheckCircle className="inline text-yellow-500 mr-2" />
          <strong>Fibonacci Golden Levels</strong> – Isticmaal golden zones si aad u ogaato goorta qiimuhu rogaal celinayo.
        </li>
        <li>
          <FaCheckCircle className="inline text-yellow-500 mr-2" />
          <strong>CRT Model</strong> – Aqoonso candlestick ranges si aad u aragto fursado ganacsi oo adag.
        </li>
        <li>
          <FaCheckCircle className="inline text-yellow-500 mr-2" />
          <strong>Time and Price Theory</strong> – Baro goorta aad suuqa ka gelayso.
        </li>
        <li>
          <FaCheckCircle className="inline text-yellow-500 mr-2" />
          <strong>Sessions Overview</strong> – Faham dabeecadda London, New York & Asia Sessions.
        </li>
        <li>
          <FaCheckCircle className="inline text-yellow-500 mr-2" />
          <strong>News Checking Formula</strong> – Baro sida loo hubiyo news-ka muhiimka ah ee saameeya suuqyada.
        </li>
        <li>
          <FaCheckCircle className="inline text-yellow-500 mr-2" />
          <strong>Entry Checklist + Real Trade Example</strong> – Ku dabaq liiska xaqiijinta ficil ahaan.
        </li>
      </ul>

      <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded-lg">
        <FaVideo className="inline mr-2" />
        <strong>🎥 Live Trades Review:</strong> Daawo sida dhammaan fikradahan loogu dabaqay suuqa dhabta ah.
      </div>

      <div className="mt-8 p-4 bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 rounded-lg">
        <FaBook className="inline mr-2" />
        <strong>✅ Marka aad dhamayso content-ga:</strong> waa in aad si buuxda ugu diyaarin karto inaad sameyso entries xirfad leh — oo ku saleysan wakhti, qiime, liquidity, iyo xaqiijin cad.
      </div>
    </div>
  );
};

export default Updates;
