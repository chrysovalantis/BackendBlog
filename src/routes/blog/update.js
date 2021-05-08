const express = require('express');
const Blog = require('../../models/blog');
const { body, param, validationResult } = require('express-validator');

const router = express.Router();

router.put(
  '/api/blog/:id',
  body('title').not().isEmpty().withMessage('Title must be provided'),
  param('id').not().isEmpty().withMessage('ID must be provided'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title } = req.body;
    const id  = req.params.id;

    var blog = null;
    try {
      blog = await Blog.findOne({
        _id: id,
      });
    } catch(err){
      console.error(err);
    }
    

    if (!blog){
      return res.status(404).send({
        "message": "Blog not found!"
      }); 
    } 

    blog.title = title;

    try {
      await blog.save();
    } catch (err) {
      console.error(err);
    }
    

    res.status(200).send(blog);
  }
);

module.exports = router;
