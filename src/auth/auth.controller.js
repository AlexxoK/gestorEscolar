import Teacher from '../teachers/teacher.model.js';
import Student from '../students/student.model.js';
import { hash, verify } from 'argon2';
import { generarJWT } from '../helpers/generate-jwt.js';

export const loginTeacher = async (req, res) => {

    const { email, password, username } = req.body;

    try {

        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerUsername = username ? username.toLowerCase() : null;

        const teacher = await Teacher.findOne({
            $or: [{ email: lowerEmail }, { username: lowerUsername }]
        });

        if (!teacher) {
            return res.status(400).json({
                msg: 'Incorrect credentials - email does not exist in the database!'
            });
        }

        if (!teacher.estado) {
            return res.status(400).json({
                msg: 'Teacher does not exist in the database!'
            });
        }

        const validPassword = await verify(teacher.password, password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'The password is incorrect!'
            });
        }

        const token = await generarJWT(teacher.id);

        return res.status(200).json({
            msg: 'Login OK!',
            teacherDetails: {
                username: teacher.username,
                token: token,
            }
        })

    } catch (e) {

        console.log(e);

        return res.status(500).json({
            message: "Server error!",
            error: e.message
        })
    }
}

export const loginStudent = async (req, res) => {

    const { email, password, username } = req.body;

    try {

        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerUsername = username ? username.toLowerCase() : null;

        const student = await Student.findOne({
            $or: [{ email: lowerEmail }, { username: lowerUsername }]
        });

        if (!student) {
            return res.status(400).json({
                msg: 'Incorrect credentials - email does not exist in the database!'
            });
        }

        if (!student.estado) {
            return res.status(400).json({
                msg: 'Student does not exist in the database!'
            });
        }

        const validPassword = await verify(student.password, password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'The password is incorrect!'
            });
        }

        const token = await generarJWT(student.id);

        return res.status(200).json({
            msg: 'Login OK!',
            studentDetails: {
                username: student.username,
                token: token,
            }
        })

    } catch (e) {

        console.log(e);

        return res.status(500).json({
            message: "Server error!",
            error: e.message
        })
    }
}

export const registerTeacher = async (req, res) => {
    try {
        const data = req.body;

        const encryptedPassword = await hash(data.password);

        const teacher = await Teacher.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: encryptedPassword,
            role: data.role,
        })

        return res.status(201).json({
            message: "Teacher registered successfully!",
            teacherDetails: {
                teacher: teacher.email
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Teacher registration failed!",
            error: err.message
        })

    }
}

export const registerStudent = async (req, res) => {
    try {
        const data = req.body;

        const encryptedPassword = await hash(data.password);

        const student = await Student.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: encryptedPassword,
            role: data.role,
        })

        return res.status(201).json({
            message: "Student registered successfully!",
            studentDetails: {
                student: student.email
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Student registration failed!",
            error: err.message
        })

    }
}