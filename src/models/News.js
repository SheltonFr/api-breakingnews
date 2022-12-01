import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

const NewsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    
    text: {
        type: String,
        require: true
    },

    banner: {
        type: String,
        require: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    user: {
        ref: 'user',
        type: mongoose.Types.ObjectId,
        require: true
    },

    likes:{
        type: Array,
        required: true,
        
    },

    comments:{
        type: Array,
        required: true, 
    },
});

const News = mongoose.model("News", NewsSchema);

export default News;