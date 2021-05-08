const express = require('express');
const Blog = require('../../models/blog');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/api/blog',
  body('title').not().isEmpty().withMessage('Title must be provided'),
  // body('articles').not().isEmpty().withMessage('Articles must be provided'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, articles } = req.body;

    if(!Array.isArray(articles)){
      return res.status(400).send({
        "message": "Articles must be an array"
      });
    }
    

    const blog = new Blog({
      title: title,
      articles: articles,
    });
    try {
      await blog.save();
    } catch (err) {
      console.error(err);
    }
    
    const findBlog = await Blog.find({
      title: title
    });

    res.status(200).send({ 'Message: ': findBlog });
  }
);

module.exports = router;
