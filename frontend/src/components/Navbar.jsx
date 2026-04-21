import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { username, logout } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-red-500 font-bold text-2xl tracking-tight flex-shrink-0">
        Swap<span className="text-white">Circle</span>
      </Link>

      <div className="flex items-center gap-6">
        {[
          { to: '/', label: 'Home' },
          { to: '/browse', label: 'Browse' },
          { to: '/services', label: 'Services' },
          { to: '/contact', label: 'Contact' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {username && (
          <>
            <span className="text-gray-500 text-sm hidden sm:block">
              👤 <span className="text-gray-300">{username}</span>
            </span>
            <button
              onClick={logout}
              className="text-gray-500 hover:text-red-400 text-xs border border-gray-700 hover:border-red-500 px-3 py-1.5 rounded-lg transition-colors"
            >
              Logout
            </button>
          </>
        )}
        <Link
          to="/add"
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
        >
          + List Item
        </Link>
      </div>
    </nav>
  );
}
