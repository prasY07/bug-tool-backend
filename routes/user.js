import express from 'express';
import { verifyUserByToken } from '../middleware/UserAuthMiddleware.js';
import { login } from '../controllers/User/AuthController.js';
import { getAssignProjects, getProjectAssignMember, getProjectDetails } from '../controllers/User/ProjectController.js';
import { addBug } from '../controllers/User/BugController.js';
import { BugAddUpdateValidation } from '../request/BugAddUpdateValidaiton.js';

const webRoutes = express.Router();


webRoutes.post('/login',login);
webRoutes.use(verifyUserByToken);
webRoutes.get('/get-assign-projects',getAssignProjects);
webRoutes.get('/:id/project-details',getProjectDetails);
webRoutes.get('/:id/project-assign-member',getProjectAssignMember);



webRoutes.post('/:id/add-bug',BugAddUpdateValidation,addBug);




export default webRoutes;