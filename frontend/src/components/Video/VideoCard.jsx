const VideoCard = ({ video, onDelete }) => {
    const getSensitivityBadgeClass = (status) => {
        switch (status) {
            case 'safe':
                return 'badge-safe';
            case 'flagged':
                return 'badge-sensitive';
            default:
                return 'badge-pending';
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDuration = (seconds) => {
        if (!seconds) return 'Unknown';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return 'Unknown';
        const mb = (bytes / (1024 * 1024)).toFixed(2);
        return `${mb} MB`;
    };

    const sensitivityStatus = video.sensitivity?.status || 'pending';
    const sensitivityScore = (video.sensitivity?.score || 0) * 100;

    return (
        <div className="card group hover:scale-[1.02] transition-all duration-300">
            <div className="relative aspect-video bg-gray-800 overflow-hidden">
                <img
                    src={video.thumbnailUrl
                        ? (video.thumbnailUrl.startsWith('http')
                            ? video.thumbnailUrl
                            : `http://127.0.0.1:5000${video.thumbnailUrl}`)
                        : 'https://via.placeholder.com/640x360?text=Processing...'}
                    alt={video.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/640x360?text=Thumbnail+Not+Found';
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                    <span className={`badge ${getSensitivityBadgeClass(sensitivityStatus)}`}>
                        {sensitivityStatus.toUpperCase()}
                    </span>
                </div>
                {video.status === 'processing' && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
                            <p className="text-white text-sm">Processing...</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {video.title}
                </h3>

                {video.description && (
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {video.description}
                    </p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDuration(video.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {video.views} views
                    </span>
                    <span>{formatFileSize(video.size)}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <span className="text-xs text-gray-500">{formatDate(video.createdAt)}</span>

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                const token = localStorage.getItem('token');
                                const url = video.url.startsWith('http')
                                    ? video.url
                                    : `http://127.0.0.1:5000/api/videos/stream/${video._id}?token=${token}`;
                                window.open(url, '_blank');
                            }}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                        >
                            Play
                        </button>
                        {onDelete && (
                            <button
                                onClick={() => onDelete(video._id)}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>

                {sensitivityStatus !== 'pending' && (
                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Sensitivity Score</span>
                            <span>{Math.round(sensitivityScore)}/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                            <div
                                className={`h-full ${sensitivityScore > 70
                                    ? 'bg-red-500'
                                    : sensitivityScore > 40
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                    }`}
                                style={{ width: `${sensitivityScore}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoCard;
