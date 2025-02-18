import { Router } from 'express';
import { validateJwt } from '../middlewares/validate-jws.js'
import { createCourse, getCoursesByTeacher, updateCourse, deleteCourse } from './course.controller.js';

const api = Router();

api.post('/create', [validateJwt], createCourse);
api.get('/teacher', [validateJwt], getCoursesByTeacher);
api.put('/update/:id', [validateJwt], updateCourse);
api.delete('/delete/:id', [validateJwt], deleteCourse);

export default api;