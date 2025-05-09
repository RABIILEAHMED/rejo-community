import React, { useState } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Document, Page, pdfjs } from 'react-pdf';

// Initialize PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const books = [
  { title: '📘 Full Stack Developer Guide', file: '/pdfs/scfx.pdf' },
  { title: '📗 Forex Trading Basics', file: '/pdfs/forex-trading-basics.pdf' },
  { title: '📙 Productivity Hacks eBook', file: '/pdfs/productivity-hacks.pdf' },
  { title: '📕 Advanced React Handbook', file: '/pdfs/advanced-react.pdf' },
  { title: '📒 JavaScript Mastery', file: '/pdfs/js-mastery.pdf' },
  { title: '📓 Next.js Guide', file: '/pdfs/nextjs-guide.pdf' },
];

const paidUsers = ['615555111', '614433222', '610123456']; // Ku dar numbers tijaabo ah

const ITEMS_PER_PAGE = 3;

const PDFBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAccessInput, setShowAccessInput] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [showViewer, setShowViewer] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePreview = (book) => {
    setSelectedBook(book);
    setShowAccessInput(true);
  };

  const handleAccessRequest = () => {
    const sanitizedPhoneInput = phoneInput.trim(); // Nadiifi gelinta lambarka

    console.log("Sanitized Phone Input: ", sanitizedPhoneInput);  // Debugging
    console.log("Paid Users: ", paidUsers);  // Debugging

    if (paidUsers.includes(sanitizedPhoneInput)) {
      setShowViewer(true); // Haddii sax yahay, muuji PDF viewer
    } else {
      setAccessDenied(true); // Haddii qalad yahay, muujiso fariinta "Access Denied"
    }

    setShowAccessInput(false); // Xir foomka gelinta lambarka
    setPhoneInput(''); // Nadiifi lambarka telefoonka
  };

  const closeModal = () => {
    setSelectedBook(null);
    setShowAccessInput(false);
    setShowViewer(false);
    setAccessDenied(false);
    setPhoneInput('');
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

      {/* Pagination Buttons */}
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

      {/* Phone Input Modal */}
      {showAccessInput && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{selectedBook.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Gali lambarka telefoonka ee lacag bixinta:</p>
            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="e.g. 615555111"
              className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleAccessRequest}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Continue
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {showViewer && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-3xl w-full text-center shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{selectedBook.title}</h3>
            <div className="border h-[80vh] overflow-y-auto rounded-lg">
              <Document
                file={selectedBook.file}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Access Denied Modal */}
      {accessDenied && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
            <h3 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">Access Denied</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Lacagta lama bixin ama number-ka sax ma aha.
            </p>
            <button
              onClick={closeModal}
              className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PDFBooks;
