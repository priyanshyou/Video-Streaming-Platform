import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video.js';

dotenv.config();

const checkVideos = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/video-streaming');
        console.log('Connected to MongoDB');

        const videos = await Video.find({});
        console.log('Total Videos:', videos.length);

        videos.forEach(v => {
            console.log('--- Video Record ---');
            console.log('ID:', v._id);
            console.log('Title:', v.title);
            console.log('Thumbnail:', v.thumbnailUrl);
            console.log('Status:', v.status);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkVideos();
