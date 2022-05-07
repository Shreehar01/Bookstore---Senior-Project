import mongoose from 'mongoose';

// Schema for registration information.
const registerSchema= new mongoose.Schema({
  collegeName:{
    type: String,
    required: true,
    trim: true
  },
  emailAddress:{
    type: String,
    trim: true
  }
})

// Exporting the Register Model
const Register= mongoose.model('Register', registerSchema)
export default Register;
