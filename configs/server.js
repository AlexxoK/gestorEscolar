'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { hash } from 'argon2';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth.routes.js';
import teacherRoutes from '../src/teachers/teacher.routes.js';
import courseRoutes from '../src/courses/course.routes.js';
import studentRoutes from '../src/students/student.routes.js';

import Teacher from '../src/teachers/teacher.model.js';
import Student from '../src/students/student.model.js';
import Course from '../src/courses/course.model.js';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) => {
    app.use("/gestorEscolar/v1/auth", authRoutes);
    app.use("/gestorEscolar/v1/teachers", teacherRoutes);
    app.use("/gestorEscolar/v1/courses", courseRoutes);
    app.use("/gestorEscolar/v1/students", studentRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log('Succesful connecting to database!')
    } catch (error) {
        console.log('Error connecting to database!');
        process.exit(1);
    }
}

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3001;

    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port ${port}!`);
    } catch (err) {
        console.log(`Server init failed: ${err}!`);
    }
}

export const createTeacher = async () => {
    try {
        const teacherExists = await Teacher.findOne({ role: "TEACHER_ROLE" });

        if (!teacherExists) {
            const hashedPassword = await hash("santosk027");

            const teacher = new Teacher({
                name: "Elmer",
                surname: "Santos",
                username: "SantosK",
                email: "santosk@gmail.com",
                password: hashedPassword,
                phone: "12345678",
                role: "TEACHER_ROLE",
            });

            await teacher.save();
            console.log("Profesor creado con éxito!");
        } else {
            console.log("El profesor ya existe!");
        }
    } catch (error) {
        console.error("Error al crear el profesor:", error.message);
    }
};

export const createStudent = async () => {
    try {
        const studentExists = await Student.findOne({ role: "STUDENT_ROLE" });

        if (!studentExists) {
            const hashedPassword = await hash("alexxok027");

            const student = new Student({
                name: "Diego",
                surname: "Monterroso",
                username: "AlexxoK",
                email: "alexxok@gmail.com",
                password: hashedPassword,
                phone: "12345678",
                role: "STUDENT_ROLE",
            });

            await student.save();
            console.log("Estudiante creado con éxito!");
        } else {
            console.log("El estudiante ya existe!");
        }
    } catch (error) {
        console.error("Error al crear el estudiante:", error.message);
    }
};

export const createDefaultCourse = async () => {
    try {
        const defaultCourseExists = await Course.findOne({ name: "Alumnos sin curso" });

        if (!defaultCourseExists) {
            const defaultTeacher = await Teacher.findOne({ role: "TEACHER_ROLE" });

            if (!defaultTeacher) {
                console.error("No se encontró un profesor predeterminado. Crea un profesor primero.");
                return;
            }

            const defaultCourse = new Course({
                name: "Alumnos sin curso",
                description: "Curso predeterminado para alumnos sin curso asignado.",
                teacher: defaultTeacher._id,
                students: [],
            });

            await defaultCourse.save();
            console.log("Curso predeterminado 'Alumnos sin curso' creado con éxito!");
        } else {
            console.log("El curso predeterminado 'Alumnos sin curso' ya existe!");
        }
    } catch (error) {
        console.error("Error al crear el curso predeterminado:", error.message);
    }
};