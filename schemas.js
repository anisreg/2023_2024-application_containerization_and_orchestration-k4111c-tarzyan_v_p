const mongoose = require('mongoose');

let User = mongoose.model('users', new mongoose.Schema(
  {
    username: String,
    animal:{
      name: {default: '', type: String},
      image: {default: '', type: String},
      info: {default: '', type: String},
      cage: {default: '', type: String},
    },
  },
  {
    versionKey: false 
  }
), 'users');

let Animal = mongoose.model('animals', new mongoose.Schema(
  {
    Photo: {
      type: String,
      default: undefined
    },
    Kind: {
      type: String,
      default: undefined
    },
    Info: {
      type: String,
      default: undefined
    },
    CageLocation: {
      type: String,
      default: undefined
    },
    global_id: {
      type: Number,
      default: undefined
    },
  },
  {
    versionKey: false
  }
), 'animals');

module.exports = {
  User: User,
  Animal: Animal
}