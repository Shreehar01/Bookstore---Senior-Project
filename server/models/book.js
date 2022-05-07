import mongoose from 'mongoose';
import User from './user.js';

// Schema for the books to be added by users
const bookSchema = new mongoose.Schema({
  subject:{
    type: String,
    trim: true
  },
  author:{
    type:String,
    trim: true
  },
  professor:{
    type: String,
    trim: true
  },
  condition:{
    type: String,
    trim: true
  },
  name:{
    type: String
  },
  notes:{
    type:String,
    default: 'No Additional Information!!!'
  },
  exam:{
    type:String,
    default: 'No Additional Information!!!'
  },
  Owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

// Exporting the Book Model
const Book = mongoose.model('Book', bookSchema);
export default Book;

