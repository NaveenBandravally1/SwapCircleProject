import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItems } from '../api';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';

const CATEGORIES = [
  { label: 'Books & Study Gear', emoji: '📚', query: 'books' },
  { label: 'Electronics & Gadgets', emoji: '💻', query: 'electronics' },
  { label: 'Cycles & Bikes', emoji: '🚲', query: 'cycles' },
  { label: 'Furniture & Appliances', emoji: '🛋️', query: 'furniture' },
];

const HOW_IT_WORKS = [
  { step: 1, title: 'List Your Item', desc: 'Add your item for sale in minutes.' },
  { step: 2, title: 'Find a Buyer', desc: 'Connect with students in your college.' },
  { step: 3, title: 'Meet & Exchange', desc: 'Meet safely on campus & trade.' },
];

export default function Home() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black pt-28 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_#e50914_0%,_transparent_70%)]" />
        <h1 className="relative text-4xl md:text-5xl font-extrabold leading-tight mb-3">
          The Student Marketplace<br />
          <span className="text-red-500">for Second-Hand Deals</span>
        </h1>
        <p className="relative text-gray-400 text-lg mb-8">Safe. Local. Student-to-Student.</p>
        <div className="relative flex justify-center gap-4 flex-wrap">
          <Link to="/browse" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Browse Listings →
          </Link>
          <Link to="/add" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Sell Your Item →
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CATEGORIES.map((c) => (
          <Link key={c.label} to={`/browse?q=${c.query}`} className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-red-500 rounded-xl p-4 flex flex-col items-center gap-2 transition-colors">
            <span className="text-3xl">{c.emoji}</span>
            <span className="text-gray-300 text-xs text-center font-medium">{c.label}</span>
          </Link>
        ))}
      </div>

      {/* Latest Listings */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Listings</h2>
          <Link to="/browse" className="text-red-500 hover:text-red-400 text-sm font-medium">View all →</Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-500">
            <span className="text-5xl">📦</span>
            <p>No items listed yet</p>
            <Link to="/add" className="text-red-500 hover:text-red-400 underline text-sm">Be the first to list one</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.slice(0, 12).map((item) => (
              <ItemCard key={item.id} item={item} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="bg-gray-900 border-t border-gray-800 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">How It Works</h2>
          <div className="flex flex-col sm:flex-row items-start justify-center gap-8">
            {HOW_IT_WORKS.map((h) => (
              <div key={h.step} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                  {h.step}
                </div>
                <h3 className="font-semibold text-white">{h.title}</h3>
                <p className="text-gray-500 text-sm text-center">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-950 border-t border-gray-800 py-10 px-6 text-center">
        <p className="text-gray-400 text-lg font-medium">Join 1,000+ Students Saving Money!</p>
        <p className="text-red-400 text-sm mt-1">Easy, Quick &amp; Trustworthy.</p>
      </div>

      <ItemModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
