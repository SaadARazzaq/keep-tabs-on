const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllDigestSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    facebookUrl: {
        type: String
    },
    instagramUrl: {
        type: String
    },
    xUrl: {
        type: String
    },
    youtubeUrl: {
        type: String
    },
    email: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false, // By default, users are not marked as favorite
    },
    isArchived: {
        type: Boolean,
        default: false, // By default, users are not marked as archived
    },
    digestCreated: {
        type: Date,
        default: Date.now // Sets the creation date to the current date by default
    }
});

const AllDigestModel = mongoose.model('All_Digest', AllDigestSchema);

module.exports = AllDigestModel;
