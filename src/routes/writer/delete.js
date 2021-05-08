const express = require('express');
const Writer = require('../../models/writer');
const { param, validationResult } = require('express-validator');

const router = express.Router();

router.delete(
  '/api/writer/:email',
  param('email').isEmail().withMessage('Email must be valid'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email  = req.params.email;

    var writer = null;
    try {
      writer = await Writer.deleteOne({
        email: email,
      });
    } catch(err){
      console.error(err);
    }
    
    if (!writer){
      return res.status(404).send({
        "message": "User not found!"
      }); 
    } 


    res.status(200).send({"Message":"User Deleted"});
  }
);

module.exports = router;
