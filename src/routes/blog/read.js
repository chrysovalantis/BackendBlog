const express = require('express');
const Blog = require('../../models/blog');
const { param, validationResult } = require('express-validator');

const router = express.Router();

router.get(
  '/api/blog/:id',
  param('id').not().isEmpty().withMessage('ID must be provided'),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    var findBlog = null;
    try{
      findBlog = await Blog.find({
        _id: id,
      }).populate('Article');
    } catch (err){
      console.err(err);
    }
    
    if(!findBlog){
      return res.status(404).send( {"Message": "Blog not found"});
    }

    res.status(200).send(findBlog);

  }
);

module.exports = router;