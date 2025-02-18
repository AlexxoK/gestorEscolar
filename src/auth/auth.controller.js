import Teacher from '../teacher/teacher.model.js';
import Student from '../student/student.model.js';
import { checkPassword, encrypt } from '../utils/encrypt.js';
import { generateJwt } from '../utils/jwt.js';

export const registerTeacher = async (req, res) => {
    try {
        const { name, surname, username, email, password, phone } = req.body;

        const existingUser = await Teacher.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'El email ya está registrado' });
        }

        const hashedPassword = await encrypt(password);
        const newTeacher = new Teacher({ 
            name, surname, username, email, password: hashedPassword, phone, role: 'TEACHER_ROLE', status: true 
        });

        await newTeacher.save();
        res.status(201).send({ message: 'Profesor registrado exitosamente', teacher: newTeacher });
    } catch (error) {
        res.status(500).send({ message: 'Error en el registro', error });
    }
};

export const registerStudent = async (req, res) => {
    try {
        const { name, surname, username, email, password, phone } = req.body;

        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'El email ya está registrado' });
        }

        const hashedPassword = await encrypt(password);
        const newStudent = new Student({ 
            name, surname, username, email, password: hashedPassword, phone, role: 'STUDENT_ROLE', status: true 
        });

        await newStudent.save();
        res.status(201).send({ message: 'Estudiante registrado exitosamente', student: newStudent });
    } catch (error) {
        res.status(500).send({ message: 'Error en el registro', error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await Teacher.findOne({ email });
        let role = 'TEACHER_ROLE';

        if (!user) {
            user = await Student.findOne({ email });
            role = 'STUDENT_ROLE';
        }

        if (!user) {
            return res.status(400).send({ message: 'Usuario o contraseña incorrectos' });
        }

        const validPassword = await checkPassword(user.password, password);
        if (!validPassword) {
            return res.status(400).send({ message: 'Usuario o contraseña incorrectos' });
        }

        const token = await generateJwt({ id: user._id.toString(), role });

        res.send({ message: 'Inicio de sesión exitoso', token, role });
    } catch (error) {
        res.status(500).send({ message: 'Error en el login', error });
    }
};