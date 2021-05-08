const express = require('express');
const Article = require('../../models/article');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/api/article',
  body('title').not().isEmpty().withMessage('Title must be provided'),
  body('excerpt').not().isEmpty().withMessage('excerpt must be provided'),
  body('text').not().isEmpty().withMessage('Text must be provided'),
  body('date_created').not().isEmpty().withMessage('Date created must be provided'),
  body('date_updated').not().isEmpty().withMessage('Date updated must be provided'),
  body('writer').not().isEmpty().withMessage('Writer must be provided'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, excerpt, text, date_created, date_updated, writer } = req.body;
    

    const article = new Article({
      title: title,
      excerpt: excerpt,
      text: text,
      date_created: date_created,
      date_updated: date_updated,
      writer: writer
    });
    try {
      await article.save();
    } catch (err) {
      console.error(err);
    }
    

    res.status(200).send({ 'Message: ': article });
  }
);

module.exports = router;
