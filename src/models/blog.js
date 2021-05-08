const mongoose = require('mongoose');
const Article = require('./article');


const blogSchema = new mongoose.Schema({
  title: String,
  articles: [{ type : mongoose.Types.ObjectId, ref: 'Article' }],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog