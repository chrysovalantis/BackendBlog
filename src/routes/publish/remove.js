const express = require('express');
const Blog = require('../../models/blog');
const Article = require('../../models/article');
const { body,param, validationResult } = require('express-validator');

const router = express.Router();

router.delete(
  '/api/publish/:articleId',
  param('articleId').not().isEmpty().withMessage('Article\' ID must be provided'),
  body('blogIds').not().isEmpty().withMessage('Blog must be provided'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const articleId = req.params.articleId; 
    const { blogIds } = req.body;

    if(!Array.isArray(blogIds)){
      return res.status(400).send({
        "message": "Blogs must be an array"
      });
    }

    var findArticle = null;
    try{
      findArticle = await Article.findOne({
        _id: articleId,
      });
    } catch (err){
      console.err(err);
    }
    
    console.log(findArticle);

    if(!findArticle){
      return res.status(404).send( {"Message": "Article not found"});
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

      console.log(findBlog.articles);

      findBlog.articles = findBlog.articles.filter(function( article ) {
        return article._id != articleId;
      });

      console.log(findBlog.articles);

      try {
        await findBlog.save();
      } catch (err) {
        console.error(err);
      }

    });

    res.status(200).send({ 'Message: ': "Article Removed" });
  }
);

module.exports = router;