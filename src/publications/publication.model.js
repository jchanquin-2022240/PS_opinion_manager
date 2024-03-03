import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
    username:{
        type: String
    },
    title:{
        type: String,
        required: [true, "Post title is required"]
    },
    category:{
        type: String,
        required: [true, "Post category is required"]
    },
    text:{
        type: String,
        required: [true, "Post text is required"]
    },
    comments:[{
        usernameC: {
            type: String
        },
        commentU: {
            type: String
        }
    }],
    publicationStatus:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publication', PublicationSchema);