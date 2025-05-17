import React, { useState } from "react";
import paymentData from "../data/paymentData.json"; // Make sure the path is correct

const books = [
  { title: '📘 Institutional Order flow', file: '/pdfs/OrderFlow.pdf' },
  { title: '📗 IRL and IRL Range LQ ', file: '/pdfs/IRL and ERL.pdf' },
  { title: '📙 Productivity Hacks eBook', file: '/pdfs/productivity-hacks.pdf' },
  { title: '📕 Advanced React Handbook', file: '/pdfs/advanced-react.pdf' },
  { title: '📒 JavaScript Mastery', file: '/pdfs/js-mastery.pdf' },
  { title: '📓 Next.js Guide', file: '/pdfs/nextjs-guide.pdf' },
];

const ITEMS_PER_PAGE = 3;

const PDFBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [phone, setPhone] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState('');
  const [downloads, setDownloads] = useState(() => {
    const saved = localStorage.getItem('downloads');
    return saved ? JSON.parse(saved) : {};
  });

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePreview = (book) => {
    setSelectedBook(book);
    setAccessGranted(false);
    setError('');
    setPhone('');
  };

  const handleVerify = () => {
    const sanitizedPhone = phone.trim().replace(/\s+/g, '');
    const bookKey = `${sanitizedPhone}_${selectedBook.title}`;

    const paidUsers = paymentData.payments.flat();

    if (!paidUsers.includes(sanitizedPhone)) {
      setError('Lambarka laguma darin liiska dadka bixiyay.');
      return;
    }

    if (downloads[bookKey]) {
      setError('Buugan mar hore ayaad u soo dagtay.');
      return;
    }

    const newDownloads = { ...downloads, [bookKey]: true };
    setDownloads(newDownloads);
    localStorage.setItem('downloads', JSON.stringify(newDownloads));

    setAccessGranted(true);
    setError('');
  };

  const closeModal = () => {
    setSelectedBook(null);
    setPhone('');
    setError('');
    setAccessGranted(false);
  };

  return (
    <section id="pdfbooks" className="bg-white dark:bg-gray-900 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">PDF Books</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
        Halkan waxaad ka heli kartaa buugaag tayo leh oo la xiriira horumarinta, trading, iyo waxbarasho guud.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {currentBooks.map((book, index) => (
          <div
            key={index}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-5 rounded-lg shadow text-lg cursor-pointer transition"
            onClick={() => handlePreview(book)}
          >
            {book.title}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{selectedBook.title}</h3>

            {!accessGranted ? (
              <>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Geli lambarka bixinta si aad u hesho buuggan.</p>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Tusaale: 634824495"
                  className="w-full p-3 rounded-lg border border-gray-300 mb-4 dark:bg-gray-700 dark:text-white"
                />
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleVerify}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Codso Gelitaan
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </>
            ) : (
              <>
                <p className="text-green-600 font-semibold mb-6">✅ Waad xaqiijisay. Halkan ka soo degso buugga:</p>
                <a
                  href={selectedBook.file}
                  download
                  onClick={closeModal}
                  className="block w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-center mb-4"
                >
                  Download
                </a>
                <button
                  onClick={closeModal}
                  className="w-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PDFBooks;
