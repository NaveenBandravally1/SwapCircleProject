import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 px-6 pb-16">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3">
            Contact <span className="text-red-500">Us</span>
          </h1>
          <p className="text-gray-400">Have a question or feedback? We'd love to hear from you.</p>
        </div>

        {sent ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-white font-bold text-xl mb-2">Message Sent!</h2>
            <p className="text-gray-500 text-sm">Thanks for reaching out. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@college.edu"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What's on your mind?"
                rows={5}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-2xl mb-2">📧</div>
            <p className="text-gray-400 text-sm">support@swapcircle.in</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-2xl mb-2">🏫</div>
            <p className="text-gray-400 text-sm">Available across college campuses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
