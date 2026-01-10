import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                VideoStream
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/dashboard"
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Dashboard
                        </Link>

                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Admin
                            </Link>
                        )}

                        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-700">
                            <div className="text-right">
                                <p className="text-sm font-medium text-white">{user?.name}</p>
                                <p className="text-xs text-gray-400">{user?.role}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-red-600/30"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
