const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    user:{ type: String, required: true},
    title: { type: String, required: true },
    des: { type: String, required: true },
    tags: { type: String, required: true},
    myImage: {type: String},
    date: { type: Date, default: Date.now },
})
BlogSchema.index({ title: 'text' });

module.exports = mongoose.model("blogs", BlogSchema);