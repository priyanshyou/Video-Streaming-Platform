import express from 'express';
import {
    uploadVideo,
    getVideos,
    getVideo,
    deleteVideo,
    streamVideo,
    getAllVideos,
} from '../controllers/video.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

// User routes
router.post('/upload', protect, upload.single('video'), uploadVideo);
router.get('/', protect, getVideos);
router.get('/:id', protect, getVideo);
router.delete('/:id', protect, deleteVideo);
router.get('/stream/:id', protect, streamVideo);

// Admin routes
router.get('/admin/all', protect, admin, getAllVideos);

export default router;
