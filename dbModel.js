const mongoose = require('mongoose');

const tiktokSchema = mongoose.Schema({
    url: String,
    light: String,
    channel: String,
    description: String,
    song: String,
    like: String,
    message: String,
    share: String,
});

const tiktokVideos = mongoose.model('tiktokVideos', tiktokSchema);
module.exports = tiktokVideos;