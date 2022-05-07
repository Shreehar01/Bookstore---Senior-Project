import express from 'express';
import {RegisterCollege} from '../controllers/Register.js';

const router= express.Router()

// Register route
router.post('/registerdata', RegisterCollege);             // For registering a college

export default router;

