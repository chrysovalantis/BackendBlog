const express = require('express');
const Article = require('../../models/article');
const { body, param, validationResult } = require('express-validator');

const router = express.Router();

router.put(
  '/api/article/:id',
  body('title').not().isEmpty().withMessage('Title must be provided'),
  body('excerpt').not().isEmpty().withMessage('excerpt must be provided'),
  body('text').not().isEmpty().withMessage('Text must be provided'),
  body('writer').not().isEmpty().withMessage('Writer must be provided'),
  param('id').not().isEmpty().withMessage('ID must be provided'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, excerpt, text, writer } = req.body;
    const id  = req.params.id;

    var article = null;
    try {
      article = await Article.findOne({
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

    article.title = title;
    article.excerpt = excerpt;
    article.text = text;
    article.date_updated = new Date();
    article.writer = writer;

    try {
      await article.save();
    } catch (err) {
      console.error(err);
    }
    

    res.status(200).send(article);
  }
);

module.exports = router;
