import express from 'express';
import { login, logout } from '../controllers/Admin/AuthController.js';
import { info, update, updateStatus, userCreate, userList } from '../controllers/Admin/UserController.js';
import { verifyAdminByToken } from '../middleware/AdminAuthMiddleware.js';
import { validateUserAdd } from '../request/UserRegisterValidation.js';
import { validateUserUpdate } from '../request/UserUpdateValidation.js';
import { projectCreate, projectInfo, projectList, projectStatus, projectUpdate } from '../controllers/Admin/ProjectController.js';

const adminApiRoutes = express.Router();


//Start Auth
adminApiRoutes.post('/login',login);
// adminApiRoutes.use(verifyAdminByToken);

adminApiRoutes.get('/logout',logout);

//End Auth


adminApiRoutes.get('/users',userList);

adminApiRoutes.post('/user/create',validateUserAdd,userCreate);
adminApiRoutes.get('/user/:id/information',info);

adminApiRoutes.put('/user/:id/update',validateUserUpdate,update);
adminApiRoutes.patch('/user/:id/update-status',updateStatus);



adminApiRoutes.get('/projects',projectList);

adminApiRoutes.post('/user/create',validateUserAdd,projectCreate);
adminApiRoutes.get('/user/:id/information',projectInfo);

adminApiRoutes.put('/user/:id/update',validateUserUpdate,projectUpdate);
adminApiRoutes.patch('/user/:id/update-status',projectStatus);



export default adminApiRoutes;