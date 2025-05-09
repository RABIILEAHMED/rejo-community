import React, { useState } from "react";

const books = [
  { title: "📘 Full Stack Developer Guide", file: "/pdfs/scfx.pdf" },
  { title: "📗 Forex Trading Basics", file: "/pdfs/forex-trading-basics.pdf" },
  { title: "📙 Productivity Hacks eBook", file: "/pdfs/productivity-hacks.pdf" },
];

const SecurePDFBooks = () => {
  const [phone, setPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const handleVerify = async () => {
    if (!phone) return setError("Fadlan geli lambarka lacagta lagu bixiyay");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (data.access) {
        setIsVerified(true);
      } else {
        setError("Weli lacag lama bixin. Fadlan iska hubi lambarka.");
      }
    } catch (err) {
      setError("Error server-ka. Isku day mar kale.");
    }
  };

  const handleDownload = (book) => {
    setSelectedBook(book);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Buugaagta La Xididay</h2>

      {!isVerified ? (
        <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Geli Lambarka Bixinta</h3>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Tusaale: 614345678"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleVerify}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
          >
            Codso Gelitaan
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ) : (
        <>
          <p className="text-green-600 font-semibold mb-6">✅ Waa lagu xaqiijiyay! Hadda waad soo dejisan kartaa buugta.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {books.map((book, index) => (
              <div
                key={index}
                onClick={() => handleDownload(book)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-5 rounded-lg shadow text-lg cursor-pointer transition"
              >
                {book.title}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal Download */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{selectedBook.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Ma rabtaa inaad buuggan kala degto?</p>
            <div className="flex justify-center space-x-4">
              <a
                href={selectedBook.file}
                download
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Download
              </a>
              <button
                onClick={() => setSelectedBook(null)}
                className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SecurePDFBooks;
