const express = require('express');
const Writer = require('../../models/writer');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/api/writer',
  body('name').not().isEmpty().withMessage('Name must be provided'),
  body('age').not().isEmpty().withMessage('Age must be provided'),
  body('email').isEmail().withMessage('Email must be valid'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, age, email } = req.body;

    var existingUser = null;
    try {
      existingUser = await Writer.findOne({ email });
    } catch(err){
      console.error(err);
    }
    
  
    if (existingUser){
      return res.status(400).send({
        "message": "Email already in use"
      });
      
    }

    const writer = new Writer({
      name: name,
      age: age,
      email: email
    });
    try {
      await writer.save();
    } catch (err) {
      console.error(err);
    }
    
    const findWriter = await Writer.find({
      name: name
    });

    res.status(200).send({ 'Message: ': findWriter });
  }
);

module.exports = router;
