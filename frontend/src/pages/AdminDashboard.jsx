import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import API from '../services/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersResponse, videosResponse] = await Promise.all([
                API.get('/users'),
                API.get('/videos/admin/all'),
            ]);
            setUsers(usersResponse.data.users || []);
            setVideos(videosResponse.data.videos || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await API.delete(`/users/${userId}`);
            setUsers(users.filter((user) => user._id !== userId));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400">Manage users and monitor all platform content</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Users</p>
                                <p className="text-3xl font-bold text-white mt-1">{users.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Videos</p>
                                <p className="text-3xl font-bold text-white mt-1">{videos.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Safe Content</p>
                                <p className="text-3xl font-bold text-white mt-1">
                                    {videos.filter((v) => v.sensitivityLabel === 'safe').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Sensitive Content</p>
                                <p className="text-3xl font-bold text-white mt-1">
                                    {videos.filter((v) => v.sensitivityLabel === 'sensitive').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="card p-6 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                                        <td className="py-3 px-4 text-white">{user.name}</td>
                                        <td className="py-3 px-4 text-gray-400">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span className={`badge ${user.role === 'admin' ? 'badge-sensitive' : 'badge-safe'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-400">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Videos Overview */}
                <div className="card p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">All Videos</h2>
                    <div className="space-y-3">
                        {videos.slice(0, 10).map((video) => (
                            <div key={video._id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                <div className="flex-1">
                                    <h3 className="text-white font-medium">{video.title}</h3>
                                    <p className="text-sm text-gray-400">By: {video.owner?.name || 'Unknown'}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`badge ${video.sensitivityLabel === 'safe' ? 'badge-safe' :
                                            video.sensitivityLabel === 'moderate' ? 'badge-moderate' :
                                                video.sensitivityLabel === 'sensitive' ? 'badge-sensitive' : 'badge-pending'
                                        }`}>
                                        {video.sensitivityLabel}
                                    </span>
                                    <span className="text-sm text-gray-500">{video.views} views</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
