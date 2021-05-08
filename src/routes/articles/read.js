const express = require('express');
const Article = require('../../models/article');
const { param, validationResult } = require('express-validator');

const router = express.Router();

router.get(
  '/api/article/:id',
  param('id').not().isEmpty().withMessage('ID must be provided'),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    var findArticle = null;
    try{
      findArticle = await Article.find({
        _id: id,
      });
    } catch (err){
      console.err(err);
    }
    
    if(!findArticle){
      return res.status(404).send( {"Message": "Article not found"});
    }

    res.status(200).send(findArticle);

  }
);

module.exports = router;