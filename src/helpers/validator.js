import { body, param } from "express-validator";
import { validateErrors } from "./validate.error.js";
import { existUsername, objectIdValid } from "./db.validators.js";
import Student from "../src/student/student.model.js";


export const registerTeacherValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').notEmpty().isEmail(),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password', 'Password must be at least 8 characters long').notEmpty().isLength({ min: 8, max: 100 }),
    body('phone', 'Phone must be between 8 and 13 characters').notEmpty().isLength({ min: 8, max: 13 }),
    validateErrors
];


export const registerStudentValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').notEmpty().isEmail(),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password', 'Password must be at least 8 characters long').notEmpty().isLength({ min: 8, max: 100 }),
    body('phone', 'Phone must be between 8 and 13 characters').notEmpty().isLength({ min: 8, max: 13 }),
    validateErrors
];


export const loginValidator = [
    body('username', 'Username cannot be empty').notEmpty().toLowerCase(),
    body('password', 'Password must be at least 8 characters long').notEmpty().isLength({ min: 8 }),
    validateErrors
];


export const updateUserValidator = [
    body('name', 'Name cannot be empty').optional().notEmpty(),
    body('surname', 'Surname cannot be empty').optional().notEmpty(),
    body('email', 'Email must be valid').optional().isEmail(),
    body('username', 'Username cannot be empty').optional().notEmpty().toLowerCase().custom(existUsername),
    body('phone', 'Phone must be between 8 and 13 characters').optional().isLength({ min: 8, max: 13 }),
    validateErrors
];


export const addCourseToStudentValidator = [
    param('studentId').custom(objectIdValid),
    body('courseId', 'Course ID cannot be empty').notEmpty().custom(objectIdValid),
    async (req, res, next) => {
        try {
            let student = await Student.findById(req.params.studentId);
            if (!student) return res.status(404).send({ message: "Student not found" });

            if (student.courses.length >= 3) {
                return res.status(400).send({ message: "Student cannot have more than 3 courses" });
            }

            if (student.courses.includes(req.body.courseId)) {
                return res.status(400).send({ message: "Student is already assigned to this course" });
            }

            next();
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: "Validation error", err });
        }
    }
];