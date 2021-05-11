const express = require('express');
const Article = require('../../models/article');
const { checkBody, validationResult } = require('express-validator');
const upload = require('../../utils/setup-multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post(
  '/api/article', 
  upload.single('image'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    req.asyncValidationErrors().then(function() {
      next();
    }).catch(function(errors) {
        req.flash('errors',errors);
        res.status(400).json({ errors: errors.array() });
    });

    const { title, excerpt, text, writer } = req.body;
    
    var article = null;
    if (req.file){
      article = new Article({
        title: title,
        excerpt: excerpt,
        text: text,
        date_created: new Date(),
        date_updated: new Date(),
        writer: writer,
        img: {
          data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
          contentType: 'image/png'
        }
      });
    } else{
      article = new Article({
        title: title,
        excerpt: excerpt,
        text: text,
        date_created: new Date(),
        date_updated: new Date(),
        writer: writer
      });
    }
    
    try {
      await article.save();
    } catch (err) {
      console.error(err);
    }
    

    res.status(200).send(article);
  }
);

module.exports = router;
