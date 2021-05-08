const express = require('express');
const Dog = require('../models/dog')

const router = express.Router();

router.get('/api/dog', async(req,res) => {
  const rex = new Dog({name: "rexoulis"})
  
  try{
    await rex.save();
  } catch(err) {
    console.error(err);
  }
  console.log("Dog saved");

  const findRex = await Dog.find({
    name: "rexoulis"
  });
  
  
  res.status(200).send({"Message: ": findRex})
});

module.exports = router