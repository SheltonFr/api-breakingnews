import mongoose from 'mongoose';

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

    user:{// "Chave estrangeira"
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // nome do schema da colllecao(tabela) User
        required: true
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