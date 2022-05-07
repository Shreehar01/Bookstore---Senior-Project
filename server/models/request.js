import mongoose from 'mongoose';
import User from './user.js';

// Schema for book requests to be added by users.
const requestSchema= new mongoose.Schema({
  subject:{
    type: String,
    trim: true
  },
  author:{
    type:String,
    trime: true
  },
  professor:{
    type: String,
    trim: true
  },
  name:{
    type: String
  },
  Owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})


// Exporting the Request Model
const Request = mongoose.model('Request', requestSchema);
export default Request;

