const express = require('express');
const Writer = require('../../models/writer');
const { param, validationResult } = require('express-validator');

const router = express.Router();

router.get(
  '/api/writer/:email',
  param('email').isEmail().withMessage('Email must be valid'),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.params.email;
    var findWriter = null;
    try{
      findWriter = await Writer.find({
        email: email,
      });
    } catch (err){
      console.err(err);
    }
    
    if(!findWriter){
      return res.status(404).send( {"Message": "User not found"});
    }

    res.status(200).send(findWriter);

  }
);

module.exports = router;