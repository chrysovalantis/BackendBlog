const express = require('express');
const Writer = require('../../models/writer');
const { body, param, validationResult } = require('express-validator');

const router = express.Router();

router.put(
  '/api/writer/:email',
  body('name').not().isEmpty().withMessage('Name must be provided'),
  body('age').not().isEmpty().withMessage('Age must be provided'),
  param('email').isEmail().withMessage('Email must be valid'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, age } = req.body;
    const email  = req.params.email;

    var writer = null;
    try {
      writer = await Writer.findOne({
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

    writer.name = name;
    writer.age = age;


    try {
      await writer.save();
    } catch (err) {
      console.error(err);
    }
    

    res.status(200).send(writer);
  }
);

module.exports = router;
