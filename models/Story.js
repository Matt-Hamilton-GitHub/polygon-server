const mongoose = require('mongoose')

const StoryScheme = new mongoose.Schema({
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // Link to the User model
    title: {type: String, required: true},
    story: {type: String, required: true },
    liked: {type: Number, default: 0 },
    tags: {type: Array, default: []},
}, {timestamps: true});

module.exports = mongoose.model('Story', StoryScheme, 'UserStories') 


