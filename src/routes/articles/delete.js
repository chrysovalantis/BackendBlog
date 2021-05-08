const express = require('express');
const Article = require('../../models/article');
const { param, validationResult } = require('express-validator');

const router = express.Router();

router.delete(
  '/api/article/:id',
  param('id').not().isEmpty().withMessage('ID must be provided'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id  = req.params.id;

    var article = null;
    try {
      article = await Article.deleteOne({
        _id: id,
      });
    } catch(err){
      console.error(err);
    }
    
    if (!article){
      return res.status(404).send({
        "message": "Article not found!"
      }); 
    } 


    res.status(200).send({"Message":"Article Deleted"});
  }
);

module.exports = router;
