const express = require('express');
const allroutes = require('./routes/AllRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(express.json()); // takes care of all requests, so headers aren't needed on front-end

const corspolicy = {
  'origin': process.env.FRONTEND_URI,
} // allow origin
app.use(cors(corspolicy));

app.use((_, __, next) => {
  console.log(`request received at ${new Date()}`);
  next();
});

//connect
const db = async () => {
  try{
    await mongoose.connect(`${process.env.ATLAS}`);
    console.log('connected to db');
  } catch (err) {
    console.log(err);
  }
}

db();
app.use('/', allroutes);

app.listen(process.env.PORT, () => { console.log(`listening on port: ${process.env.PORT}`) });
