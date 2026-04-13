import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        SentiScope
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.name}
        </span>
        <button
          onClick={logout}
          className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
