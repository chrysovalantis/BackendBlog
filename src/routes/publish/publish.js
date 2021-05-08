const express = require('express');
const Blog = require('../../models/blog');
const Article = require('../../models/article');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/api/publish',
  body('articleId').not().isEmpty().withMessage('Article must be provided'),
  body('blogIds').not().isEmpty().withMessage('Blog must be provided'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { articleId, blogIds } = req.body;

    if(!Array.isArray(blogIds)){
      return res.status(400).send({
        "message": "Blogs must be an array"
      });
    }

    var findArticle = null;
    try{
      findArticle = await Article.find({
        _id: articleId,
      });
    } catch (err){
      console.err(err);
    }
    
    if(!findArticle){
      return res.status(404).send( {"Message": "Blog not found"});
    }
    
    blogIds.forEach(async id => {
      var findBlog = null;
      try{
        findBlog = await Blog.findOne({
          _id: id,
        });
      } catch (err){
        console.err(err);
      }
      
      if(!findBlog){
        return res.status(404).send( {"Message": "Blog not found"});
      }

      console.log(findBlog);

      findBlog.articles.push(id);

      try {
        await findBlog.save();
      } catch (err) {
        console.error(err);
      }

    });

    res.status(200).send({ 'Message: ': "Article Published" });
  }
);

module.exports = router;