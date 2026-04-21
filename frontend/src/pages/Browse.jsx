import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getItems } from '../api';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Books & Study Gear', value: 'books' },
  { label: 'Electronics & Gadgets', value: 'electronics' },
  { label: 'Cycles & Bikes', value: 'cycles' },
  { label: 'Furniture & Appliances', value: 'furniture' },
  { label: 'Other', value: 'other' },
];

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [sort, setSort] = useState('newest');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    getItems()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  // Sync URL ?q= param into search box on first load
  useEffect(() => {
    const q = searchParams.get('q') || '';
    // If q matches a category value, activate that filter instead
    const matchedCat = CATEGORIES.find(c => c.value && c.value === q);
    if (matchedCat) {
      setActiveCategory(q);
      setSearch('');
    } else {
      setSearch(q);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = items
    .filter((i) => {
      const matchesSearch =
        !search ||
        i.title?.toLowerCase().includes(search.toLowerCase()) ||
        i.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !activeCategory ||
        i.category?.toLowerCase() === activeCategory.toLowerCase() ||
        i.title?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        i.description?.toLowerCase().includes(activeCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sort === 'price-desc') return (b.price || 0) - (a.price || 0);
      return (b.id || 0) - (a.id || 0);
    });

  const handleSearch = (val) => {
    setSearch(val);
    setSearchParams(val ? { q: val } : {});
  };

  const handleCategory = (val) => {
    setActiveCategory(val);
    setSearch('');
    setSearchParams(val ? { q: val } : {});
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">Browse Items</h1>
          <p className="text-gray-500 text-sm">Find great second-hand deals from students near you</p>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => handleCategory(c.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === c.value
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search items..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-500">
            <span className="text-5xl">📦</span>
            <p>{search || activeCategory ? 'No results found' : 'No items listed yet'}</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-4">
              {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
              {activeCategory && <span className="text-gray-400"> in <span className="text-white capitalize">{activeCategory}</span></span>}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filtered.map((item) => (
                <ItemCard key={item.id} item={item} onClick={setSelected} />
              ))}
            </div>
          </>
        )}
      </div>

      <ItemModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
