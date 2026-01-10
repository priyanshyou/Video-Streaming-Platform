import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    filename: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
    },
    size: {
        type: Number,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // in seconds
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending',
    },
    sensitivity: {
        status: {
            type: String,
            enum: ['pending', 'safe', 'flagged'],
            default: 'pending',
        },
        score: {
            type: Number,
            default: 0,
        },
        details: {
            type: Object,
        },
    },
    views: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
