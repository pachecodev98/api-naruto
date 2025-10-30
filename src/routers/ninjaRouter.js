

import { Router } from 'express';
import {
  createNinjaController,
  getNinjaByIdController,
  getAllNinjasController,
  updateNinjaController,
  deleteNinjaController,
} from '../controllers/ninja/ninjaController.js';
import authMiddleware from '../middleware/auth.js';

const routerNinja = Router();

routerNinja.use(authMiddleware);

routerNinja.post('/ninja', createNinjaController);

routerNinja.get('/ninja/:id', getNinjaByIdController);

routerNinja.get('/ninjas', getAllNinjasController);

routerNinja.patch('/ninja/:id', updateNinjaController);

routerNinja.delete('/ninja/:id', deleteNinjaController);

export default routerNinja;
