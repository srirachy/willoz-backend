const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema(
  {
    "_id": {
      "type": "Number",
    },
    "address": {
      "type": "String",
      "required": true,
    },
    "county": {
      "type": "String",
      "required": true,
    },
    "description": {
      "type": "String",
      "required": true,
    },
    "price": {
      "type": "Number",
      "required": true,
    },
    "photo": {
      "type": "String",
      "required": true,
    }
  }
);

const userSchema = new mongoose.Schema(
  {
    "name": {
      "type": "String",
      "required": true
    },
    "email": {
      "type": "String",
      "required": true,
      "unique": true
    },
    "tele": {
      "type": "String",
      "required": true
    },
    "password": {
      "type": "String",
      "required": true
    },
    "role": {
      "type": String,
      "required": true,
      "default": "user"
    }
  }
);

const enquirySchema = new mongoose.Schema(
  {
    "address": {
      "type": "String",
      "required": true
    },
    "name": {
      "type": "String",
      "required": true
    },
    "email": {
      "type": "String",
      "required": true
    },
    "mobile": {
      "type": "String",
    },
    "remarks": {
      "type": "String",
      "required": true
    },
    "submittedDate": {
      "type": Date,
      "default": new Date()  
    }
  }
);

const Houses = mongoose.model('House', houseSchema);
const Users = mongoose.model('User', userSchema);
const Enquiries = mongoose.model('Enquiry', enquirySchema);

module.exports = {Houses, Users, Enquiries};