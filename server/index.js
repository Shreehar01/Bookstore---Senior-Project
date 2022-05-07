// Importing required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Importing different routes
import userRoutes from './routes/User.js';
import bookRoutes from './routes/Book.js';
import requestRoutes from './routes/Request.js';
import registerRoutes from './routes/Register.js';

// Setting up the express object
const app = express();
dotenv.config();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// Specifying routes for different models
app.use('/book', bookRoutes);
app.use('/user', userRoutes);
app.use('/request', requestRoutes);
app.use('/register', registerRoutes);

// Default page for the server-side application
app.get('/', (req, res) => {
    res.send('Welcome to Bookstore!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(()=> app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
 .catch((error)=> console.log(error.message));
mongoose.set('useFindAndModify', false);


