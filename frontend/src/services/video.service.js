import API from './api';

export const videoService = {
    uploadVideo: async (formData, onProgress) => {
        const response = await API.post('/videos/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                if (onProgress) {
                    onProgress(percentCompleted);
                }
            },
        });
        return response.data;
    },

    getVideos: async () => {
        const response = await API.get('/videos');
        return response.data;
    },

    getVideo: async (id) => {
        const response = await API.get(`/videos/${id}`);
        return response.data;
    },

    getStreamUrl: async (id) => {
        const response = await API.get(`/videos/${id}/stream`);
        return response.data;
    },

    deleteVideo: async (id) => {
        const response = await API.delete(`/videos/${id}`);
        return response.data;
    },

    getAllVideos: async () => {
        const response = await API.get('/videos/admin/all');
        return response.data;
    },
};
