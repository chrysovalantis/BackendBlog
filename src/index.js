const mongoose = require('mongoose');
const app = require('./app');

const start = async () =>{

  // environment variables check
  // if (!process.env.DATABASE_URL){
  //   throw new Error('Database URL must be defined');
  // }

  // db connection
  try{
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDB');
    
  } catch (err) {
    console.error(err);
  }
  
  app.listen(4000, () => {
    console.log('Listening on 4000');
  });
}

start();