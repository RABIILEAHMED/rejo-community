import React, { useState } from 'react';

const fakePosts = [
  {
    id: 1,
    title: 'Maskaxda Dhis Ka Hor Maalka',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: 'Haddii maskaxdaada aysan diyaar ahayn, maalgashi iyo lacag midna wax kuu tari maayaan.',
    category: 'Mindset'
  },
  {
    id: 2,
    title: 'Noloshaada Bedel Maanta',
    videoUrl: 'https://www.youtube.com/embed/2g811Eo7K8U',
    content: 'Isbedelka ugu muhiimsan wuxuu bilaabmaa marka aad go’aan adag qaadato.',
    category: 'Motivation'
  },
  {
    id: 3,
    title: 'Xirfaduhu Waa Furaha Mustaqbalka',
    videoUrl: 'https://www.youtube.com/embed/oHg5SJYRHA0',
    content: 'Haddii aad baratid xirfad cusub, waxaad gacanta ku haysaa fure cusub oo mustaqbalkaaga furaya.',
    category: 'Skills'
  },
  {
    id: 4,
    title: 'Ha Sugina Wakhti Kuu Fiican',
    videoUrl: 'https://www.youtube.com/embed/IUN664s7N-c',
    content: 'Hadda bilow wax kasta oo aad rabto – wakhti fiican ma yimaado laakin adiga ayaa abuurta.',
    category: 'Motivation'
  },
  {
    id: 5,
    title: 'Noloshu Waa Dagaal Maskaxeed',
    videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
    content: 'Maskax adag oo aan ka niyad jabin ayaa kuu sahli karta guul joogto ah.',
    category: 'Mindset'
  }
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const ChangeYourLifeNow = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [posts, setPosts] = React.useState(fakePosts);
  const [showNotice, setShowNotice] = useState(true);  // had iyo jeer markasta page load

  const postsPerPage = 3;
  const categories = ['All', 'Mindset', 'Skills', 'Motivation'];

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
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-500">Change Your Life Now</h2>

      {/* Fariin Ogaysiis - Had iyo jeer muuqata marka page load, la qariyo button riix */}
      {showNotice && (
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 p-6 rounded-xl shadow mb-8 text-center">
          <p className="text-lg font-semibold mb-3">
            Haddii aad tahay dhalinyaro misna rabto isbadal dhab ah & la jaanqaad dhalinyaro hadda bilaabaya safarka isbedelka… <br />
            <span className="text-yellow-600 dark:text-yellow-300">Halkan kaalay saaxiib!</span>
          </p>
          <a
            href="https://t.me/rejocommunity"
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

      {/* Controls */}
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
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                className="w-full rounded-md"
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
