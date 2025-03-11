import Role from '../role/role.model.js';
import Teacher from '../teachers/teacher.model.js';
import Student from '../students/student.model.js';
import Course from '../courses/course.model.js';

export const esRoleValido = async (role = ' ') => {
    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`Role ${role} does not exist in the database!`);
    }
}

export const existenteTeacherEmail = async (email = ' ') => {
    const existeTeacherEmail = await Teacher.findOne({ email });

    if (existeTeacherEmail) {
        throw new Error(`Email ${email} exists in the database!`);
    }
}

export const existenteStudentEmail = async (email = ' ') => {
    const existeStudentEmail = await Student.findOne({ email });

    if (existeStudentEmail) {
        throw new Error(`Email ${email} exists in the database!`);
    }
}

export const existeCourseById = async (id = ' ') => {
    const existeCourse = await Course.findOne({ id });

    if (existeCourse) {
        throw new Error(`id ${id} exists in the database!`);
    }
}

export const existeTeacherById = async (id = ' ') => {
    const existeTeacher = await Teacher.findOne({ id });

    if (existeTeacher) {
        throw new Error(`id ${id} exists in the database!`);
    }
}

export const existeStudentById = async (id = ' ') => {
    const existeStudent = await Student.findOne({ id });

    if (existeStudent) {
        throw new Error(`id ${id} exists in the database!`);
    }
}