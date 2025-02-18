import { Router } from 'express';
import { getAll, update, remove } from './teacher.controller.js';
import { validateJwt } from '../middlewares/validate-jws.js'

const api = Router();


api.get('/teacher', [validateJwt],getAll); 
api.put('/teacher/:id', [validateJwt], update);
api.delete('/teacher/:id', [validateJwt],  remove); 

export default api;