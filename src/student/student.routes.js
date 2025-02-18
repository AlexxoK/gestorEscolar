import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jws.js'
import { getAll, update, remove, assignCourse } from './student.controller.js'

const api = Router();

api.get('/student', [validateJwt],getAll); 
api.put('/student/:id', [validateJwt], update);
api.delete('/student/:id', [validateJwt],  remove);
api.put('/addCourse', [validateJwt], assignCourse)

export default api;