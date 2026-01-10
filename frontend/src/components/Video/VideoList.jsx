import VideoCard from './VideoCard';
import { videoService } from '../../services/video.service';

const VideoList = ({ videos, loading, onRefresh }) => {
    const handleDelete = async (videoId) => {
        if (!window.confirm('Are you sure you want to delete this video?')) {
            return;
        }

        try {
            await videoService.deleteVideo(videoId);
            if (onRefresh) onRefresh();
        } catch (err) {
            alert('Failed to delete video');
            console.error(err);
        }
    };

    if (loading && videos.length === 0) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading videos...</p>
                </div>
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="text-center py-20">
                <svg
                    className="w-24 h-24 mx-auto mb-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No videos yet</h3>
                <p className="text-gray-500">Upload your first video to get started</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">My Videos</h2>
                <p className="text-gray-400">{videos.length} video{videos.length !== 1 ? 's' : ''} in library</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default VideoList;
