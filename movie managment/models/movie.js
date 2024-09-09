const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    releaseDate: Date,
    genre: String,
    rating: Number,
    poster: String
});

module.exports = mongoose.model('Movie', movieSchema);
