const express = require('express');
const multer = require('multer');
const {Houses, Users, Enquiries} = require('../models/allschemas');

const allroutes = express.Router();
const upload = multer();

allroutes.get('/', (_, res) => {
  console.log('root called');
  res.send(`Welcome to willoz backend`);
});

allroutes.get('/houses', async (_, res) => {
  console.log('houses called');
  try {
    const houses = await Houses.find({});
    res.send(houses);
  } catch (err) {
    console.log('error in /houses')
    res.status(500).send(err);
  }
});

allroutes.post('/register', upload.none(), async (req, res) => {
  try{
    console.log(req.body);
    const newUser = new Users(req.body);
    const result = await newUser.save();
    console.log(result);
    res.send(result);
  } catch (err) {
    // check if user already exists and send appropriate message
    // error code is 1100 - dupe user
    console.log('error in /register');
    res.status(500).send(err);
  }
});

allroutes.post('/login', upload.none(), async (req, res) => {
  try{
    const {email: uEmail, password: uPassword} = req.body;
    const response = await Users.find({email: uEmail, password: uPassword});
    console.log(response);
    (response.length > 0) ? res.send(response) : res.send({success:false});
  } catch (err) {
    console.log('error in /login');
    res.status(500).send(err);
  }
});

allroutes.post('/addenquiry', upload.none(), async (req, res) => {
  try{
    const newEnquiry = new Enquiries(req.body);
    const result = await newEnquiry.save();
    console.log(result);
    res.send(result);
  } catch(err){
    console.log('error in /addenquiry');
    res.status(500).send(err);
  }
});

allroutes.get('/enquiries', async (_, res) => {
  try{ 
    const enquiries = await Enquiries.find({});
    res.send(enquiries);
  } catch(err){
    console.log('error in /enquiries')
    res.status(500).send(err);
  }
})

module.exports = allroutes;
