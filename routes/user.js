import express from 'express';
import { createQuery } from '../controllers/User/ContactController.js';
import { getExam } from '../controllers/User/ExamController.js';

const webRoutes = express.Router();
webRoutes.get('/exam/latest',getExam);
webRoutes.post('/contact-us',createQuery);

export default webRoutes;