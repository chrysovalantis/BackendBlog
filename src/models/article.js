const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  text: String,
  date_created: Date,
  date_updated: Date,
  writer: { type : mongoose.Types.ObjectId, ref: 'Writer' },
  img:
    {
        data: Buffer,
        contentType: String,
        required: false
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article