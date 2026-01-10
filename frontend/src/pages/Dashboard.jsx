import { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import VideoUpload from '../components/Video/VideoUpload';
import VideoList from '../components/Video/VideoList';
import { videoService } from '../services/video.service';
import { useSocket } from '../contexts/SocketContext';

const Dashboard = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { socket } = useSocket();

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const data = await videoService.getVideos();
            setVideos(data || []);
        } catch (err) {
            console.error('Failed to fetch videos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [refreshTrigger]);

    useEffect(() => {
        if (socket) {
            socket.on('videoStatusUpdate', (data) => {
                setVideos(prev => prev.map(v =>
                    v._id === data.videoId
                        ? { ...v, status: data.status, sensitivity: data.video?.sensitivity || v.sensitivity }
                        : v
                ));
                // If completed, we might want to refresh to get the full object
                if (data.status === 'completed') {
                    fetchVideos();
                }
            });

            return () => socket.off('videoStatusUpdate');
        }
    }, [socket]);

    const handleUploadSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const stats = {
        total: videos.length,
        safe: videos.filter(v => v.sensitivity?.status === 'safe').length,
        processing: videos.filter(v => v.status === 'processing' || v.status === 'pending').length
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                        Video Dashboard
                    </h1>
                    <p className="text-gray-400">Upload, manage, and stream your videos with sensitivity analysis</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <VideoUpload onUploadSuccess={handleUploadSuccess} />
                    </div>

                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <span className="text-gray-300">Total Videos</span>
                                <span className="text-2xl font-bold text-blue-400">{stats.total}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                                <span className="text-gray-300">Safe Content</span>
                                <span className="text-2xl font-bold text-green-400">{stats.safe}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <span className="text-gray-300">Processing</span>
                                <span className="text-2xl font-bold text-purple-400">{stats.processing}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <VideoList videos={videos} loading={loading} onRefresh={handleUploadSuccess} />
            </div>
        </div>
    );
};

export default Dashboard;
