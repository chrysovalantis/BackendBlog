const express = require('express');
const Blog = require('../../models/blog');
const { param, validationResult } = require('express-validator');

const router = express.Router();

router.get(
  '/api/blog/retrieve-articles/:id',
  param('id').not().isEmpty().withMessage('Blog ID must be provided'),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    var findBlog = null;
    try{
      findBlog = await Blog.findOne({
        _id: id,
      }).populate('articles').exec();
    } catch (err){
      console.err(err);
    }
    
    if(!findBlog){
      return res.status(404).send( {"Message": "Blog not found"});
    }
    console.log(findBlog);

    res.status(200).send(findBlog.articles);

  }
);

module.exports = router;