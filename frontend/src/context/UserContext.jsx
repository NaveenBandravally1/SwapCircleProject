import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [username, setUsername] = useState(() => localStorage.getItem('sc_username') || '');
  const [showPrompt, setShowPrompt] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!username) setShowPrompt(true);
  }, [username]);

  const save = () => {
    if (!input.trim()) return;
    const name = input.trim();
    localStorage.setItem('sc_username', name);
    setUsername(name);
    setShowPrompt(false);
  };

  const logout = () => {
    localStorage.removeItem('sc_username');
    setUsername('');
    setShowPrompt(true);
  };

  return (
    <UserContext.Provider value={{ username, setUsername, logout }}>
      {showPrompt && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            <div className="text-center mb-6">
              <h1 className="text-red-500 font-extrabold text-3xl tracking-tight mb-1">
                Swap<span className="text-white">Circle</span>
              </h1>
              <p className="text-gray-500 text-sm">Student Marketplace</p>
            </div>

            <h2 className="text-white font-bold text-lg mb-1">Create your profile</h2>
            <p className="text-gray-500 text-sm mb-5">Pick a username to start chatting and making offers</p>

            <div className="space-y-3">
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && save()}
                placeholder="Username (e.g. rahul_123)"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
              />
              <button
                onClick={save}
                disabled={!input.trim()}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Join SwapCircle
              </button>
            </div>

            <p className="text-gray-600 text-xs text-center mt-4">
              Your username is saved locally — no account needed.
            </p>
          </div>
        </div>
      )}
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
