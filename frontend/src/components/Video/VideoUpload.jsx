import { useState } from 'react';
import { videoService } from '../../services/video.service';

const VideoUpload = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
            if (!validTypes.includes(file.type)) {
                setError('Invalid file type. Please select a video file.');
                return;
            }

            // Validate file size (100MB)
            if (file.size > 104857600) {
                setError('File size exceeds 100MB limit.');
                return;
            }

            setSelectedFile(file);
            setError('');
            if (!title) {
                setTitle(file.name.replace(/\.[^/.]+$/, ''));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setError('Please select a video file');
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('video', selectedFile);
            formData.append('title', title);
            formData.append('description', description);

            await videoService.uploadVideo(formData, (progress) => {
                setUploadProgress(progress);
            });

            setSuccess('Video uploaded successfully! Processing sensitivity analysis...');
            setSelectedFile(null);
            setTitle('');
            setDescription('');
            setUploadProgress(0);

            if (onUploadSuccess) {
                onUploadSuccess();
            }

            // Clear success message after 5 seconds
            setTimeout(() => setSuccess(''), 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="card p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Upload New Video</h2>
                <p className="text-gray-400">Share your content with the platform</p>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Video File
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                            className="hidden"
                            id="video-upload"
                        />
                        <label
                            htmlFor="video-upload"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-300 bg-gray-800/50"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-12 h-12 mb-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">MP4, MOV, AVI, WEBM (MAX. 100MB)</p>
                            </div>
                        </label>
                    </div>
                    {selectedFile && (
                        <p className="mt-2 text-sm text-gray-400">
                            Selected: <span className="text-blue-400">{selectedFile.name}</span>
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                        placeholder="Enter video title"
                        required
                        disabled={uploading}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                        Description (Optional)
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field resize-none"
                        placeholder="Enter video description"
                        rows="4"
                        disabled={uploading}
                    />
                </div>

                {uploading && (
                    <div>
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={uploading || !selectedFile}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? `Uploading ${uploadProgress}%` : 'Upload Video'}
                </button>
            </form>
        </div>
    );
};

export default VideoUpload;
