import jwt from 'jsonwebtoken';

import Teacher from '../teachers/teacher.model.js';
import Student from '../students/student.model.js';

export const validarTeacherJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "There is no token in the request!"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const teacher = await Teacher.findById(uid);

        if (!teacher) {
            return res.status(401).json({
                msg: 'Teacher does not exist in te database!'
            })
        }

        if (!teacher.estado) {
            return res.status(401).json({
                msg: 'Token not valid - teachers with estado: false!'
            })
        }

        req.teacher = teacher;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token not valid!"
        })
    }
}

export const validarStudentJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "There is no token in the request!"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const student = await Student.findById(uid);

        if (!student) {
            return res.status(401).json({
                msg: 'Student does not exist in te database!'
            })
        }

        if (!student.estado) {
            return res.status(401).json({
                msg: 'Token not valid - students with estado: false!'
            })
        }

        req.student = student;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token not valid!"
        })
    }
}