import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem, uploadImage } from '../api';
import { useUser } from '../context/UserContext';

export default function AddItem() {
  const navigate = useNavigate();
  const { username } = useUser();
  const [form, setForm] = useState({ title: '', description: '', price: '', condition: 'Good', category: 'books' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.price) { setError('Title and price are required'); return; }

    setUploading(true);
    try {
      let imageUrls = [];
      if (imageFile) {
        const path = await uploadImage(imageFile);
        imageUrls = [path];
      }
      await createItem({ ...form, price: parseFloat(form.price), imageUrls, owner: username || 'anonymous' });
      navigate('/');
    } catch (err) {
      setError('Failed to create item. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
  const categories = [
    { label: 'Books & Study Gear', value: 'books' },
    { label: 'Electronics & Gadgets', value: 'electronics' },
    { label: 'Cycles & Bikes', value: 'cycles' },
    { label: 'Furniture & Appliances', value: 'furniture' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-6 pb-10">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">List an Item</h1>
          <p className="text-gray-500 mt-1">Fill in the details and upload a photo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image upload */}
          <label className="block">
            <div className={`border-2 border-dashed rounded-xl cursor-pointer transition-colors flex items-center justify-center overflow-hidden ${preview ? 'border-red-500' : 'border-gray-700 hover:border-gray-500'}`} style={{ height: 220 }}>
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>

          <div>
            <label className="text-gray-400 text-sm block mb-1">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="What are you selling?"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 text-sm"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the item..."
              rows={3}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 text-sm resize-none"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-1">Price (₹) *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="0.00"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 text-sm"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-gray-400 text-sm block mb-1">Condition</label>
              <select
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 text-sm"
              >
                {conditions.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-gray-400 text-sm block mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 text-sm"
              >
                {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            {uploading ? 'Publishing...' : 'Publish Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
