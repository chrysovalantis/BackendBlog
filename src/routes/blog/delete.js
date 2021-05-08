const express = require('express');
const Blog = require('../../models/blog');
const { param, validationResult } = require('express-validator');

const router = express.Router();

router.delete(
  '/api/blog/:id',
  param('id').not().isEmpty().withMessage('ID must be provided'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id  = req.params.id;

    var blog = null;
    try {
      blog = await Blog.findByIdAndRemove(id);
    } catch(err){
      console.error(err);
    }

    console.log(blog);

    if (!blog){
      return res.status(404).send({
        "message": "Blog not found!"
      }); 
    } 


    res.status(200).send({"Message":"Blog Deleted"});
  }
);

module.exports = router;
