import { Router } from 'express';
import { registerTeacher, registerStudent, login } from '../auth/auth.controller.js';

const api = Router();

api.post('/register/teacher', registerTeacher);
api.post('/register/student', registerStudent);
api.post('/login', login);

export default api;