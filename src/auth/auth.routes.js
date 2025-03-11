import { Router } from 'express';
import { loginTeacher, loginStudent, registerTeacher, registerStudent } from './auth.controller.js';
import { registerTeacherValidator, registerStudentValidator, loginValidator } from '../middlewares/validator.js';
import { deleteFileOnError } from '../middlewares/delete-file-on-error.js';

const router = Router();

router.post(
    '/loginTeacher',
    loginValidator,
    deleteFileOnError,
    loginTeacher
);

router.post(
    '/loginStudent',
    loginValidator,
    deleteFileOnError,
    loginStudent
);

router.post(
    '/registerTeacher',
    registerTeacherValidator,
    deleteFileOnError,
    registerTeacher
);

router.post(
    '/registerStudent',
    registerStudentValidator,
    deleteFileOnError,
    registerStudent
);

export default router;