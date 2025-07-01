import React, { useState } from 'react';

const fakePosts = [
  {
    id: 1,
    title: 'Sheekh mustafa xaji ismaacil',
    videoUrl: 'https://www.youtube.com/embed/TBaNr3eORWw?start=971',
    content: 'Isbadal samee 2025 ✍️ ka faaideyso waqtiga ⏳ Dhiirigalin | Sheekh Mustafe |',
    category: 'Motivation + wacdi '
  },
  {
    id: 2,
    title: 'saalim omer | naf ogaal',
    videoUrl: 'https://www.youtube.com/embed/8PK6LOWEn98',
    content: 'Qof aan 100% wax kayar ku qancayn iyo xalka uu kaga bixi karo.',
    category: 'Mindset'
  },
  {
    id: 3,
    title: 'Fikradaha xaliye ali',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLsBT1fk6KIR7uGgnkfGC-QvThPqwBsQuj',
    content: 'Maxaa Gadaal u dhigaya Noloshaada?',
    category: 'Mindset'
  },
  {
    id: 4,
    title: 'Saalim omer',
    videoUrl: 'https://www.youtube.com/embed/i9DuVh-HzdM',
    content: 'Sidee wax u Joogteeyaa? EP 12 | The Psychology of Consistency',
    category: 'Mindset'
  },
  {
    id: 5,
    title: 'Rabiile ahmed',
    videoUrl: 'https://www.youtube.com/embed/vYeTSsQHYcc',
    content: 'XIRFADAHAN MID KEE BARAN LAHAYD',
    category: 'Skills'
  },
  {
    id: 6,
    title: 'Sheekh khadar badeed ',
    videoUrl: 'https://www.youtube.com/embed/QtSGoJa1c4M?start=218',
    content: 'DHALIN YARADA IYO GUULAYSIGA || MADARI PODCAST',
    category: 'Skills'
  },
  {
    id: 6,
    title: 'Sheekh khadar badeed ',
    videoUrl: 'https://www.youtube.com/embed/Z8r0P_MgHMQ?start=365',
    content: 'DHALIN YARADA IYO GUULAYSIGA || MADARI PODCAST',
    category: 'Skills'
  }
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const ChangeYourLifeNow = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(fakePosts);
  const [showNotice, setShowNotice] = useState(true);

  const postsPerPage = 3;
  const categories = ['All', 'Mindset', 'Skills'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  const handleShuffle = () => {
    setPosts(shuffleArray(posts));
    setCurrentPage(1);
  };

  const handleCloseNotice = () => {
    setShowNotice(false);
  };

  return (
    <section id="changeyourlife" className="px-6 py-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-500">Life Changing Lessons </h2>

      {showNotice && (
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 p-6 rounded-xl shadow mb-8 text-center">
          <p className="text-lg font-semibold mb-3">
           Halkan waxaan kugu soo uruuriyey muuqaalo iyo talooyin kaa caawinaya inaad noqoto qofka ugu fiican ee aad noqon karto hadii aad dabaqdo saaxiib . <br />
            <span className="text-yellow-600 dark:text-yellow-300">Halkan kaalay saaxiib!</span>
          </p>
          <a
            href="https://t.me/+x2NZ91lFAjQ2OTJk"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCloseNotice}
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-lg transition"
          >
            💥 Ku Dhiirro — Ku Biir Telegram
          </a>
          <button
            onClick={handleCloseNotice}
            className="ml-4 text-yellow-700 dark:text-yellow-300 font-bold hover:underline"
            aria-label="Close notice"
          >
            X
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="🔍 Raadi boostada..."
          className="px-4 py-2 w-full md:w-1/2 rounded border dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          onClick={handleShuffle}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          🔄 Randomize Videos
        </button>
      </div>

      <div className="flex justify-center mb-8 space-x-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full font-semibold border ${
              selectedCategory === cat
                ? 'bg-yellow-500 text-white border-yellow-500'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {currentPosts.length === 0 ? (
        <p className="text-center text-gray-500">☹️ Lama helin wax video ah oo la jaanqaadaya raadinta ama category-ga.</p>
      ) : (
        currentPosts.map(post => (
          <div key={post.id} className="mb-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">{post.title}</h3>
            <div className="mb-4">
              <iframe
                className="w-full h-60 rounded-md object-cover border border-yellow-400 shadow-xl"
                src={post.videoUrl}
                allowFullScreen
                title={post.title}
              ></iframe>
            </div>
            <p className="text-lg">{post.content}</p>
          </div>
        ))
      )}

      {filteredPosts.length > postsPerPage && (
        <div className="flex justify-center mt-8 space-x-4">
          {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded font-semibold ${
                currentPage === i + 1
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ChangeYourLifeNow;
