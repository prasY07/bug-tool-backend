import express from 'express';
import { verifyUserByToken } from '../middleware/UserAuthMiddleware.js';
import { login } from '../controllers/User/AuthController.js';
import { getAssignProjects } from '../controllers/User/ProjectController.js';

const webRoutes = express.Router();


webRoutes.post('/login',login);
webRoutes.use(verifyUserByToken);
webRoutes.get('/get-assign-projects',getAssignProjects);




export default webRoutes;