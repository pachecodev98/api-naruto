
import { Router } from 'express';
import {
  createUserController,
  authUserController,
} from '../controllers/user/userController.js';

const routerUser = Router();


routerUser.post('/user', createUserController);

routerUser.post('/auth', authUserController);

export default routerUser;
