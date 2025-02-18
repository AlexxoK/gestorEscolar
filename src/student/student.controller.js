import Student from './student.model.js'
import Course from '../courses/course.model.js'

export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;
        const students = await Student.find().skip(skip).limit(limit);

        if (students.length === 0) return res.status(404).send({ message: 'Students not found', success: false });

        return res.send({ success: true, message: 'Students found', students, total: students.length });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'General error', err });
    }
};

export const update = async (req, res) => {
    try {
        let studentId = req.params.id;
        let data = req.body;

        if (data.password) delete data.password;

        let updatedStudent = await Student.findByIdAndUpdate(studentId, data, { new: true });

        if (!updatedStudent) {
            return res.status(404).send({ message: 'Student not found' });
        }

        return res.send({ message: 'Student updated successfully', updatedStudent });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error updating student', err });
    }
};

export const remove = async (req, res) => {
    try {
        let studentId = req.params.id;
        let deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) return res.status(404).send({ message: 'Student not found' });

        return res.send({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error deleting student' });
    }
};

export const assignCourse = async (req, res) => {
    try {
        console.log(' req.user:', req.user);

        const studentId = req.user.id;
        const { courseId } = req.body;

        if (!studentId) return res.status(400).send({ message: 'No se encontró el ID del estudiante en el token' });

        const student = await Student.findById(studentId);
        if (!student) {
            console.log(' No se encontró en la base de datos:', studentId);
            return res.status(404).send({ message: 'Estudiante no encontrado' });
        }

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).send({ message: 'Curso no encontrado' });

        if (student.courses.includes(courseId)) {
            return res.status(400).send({ message: 'El estudiante ya está en este curso' });
        }

        if (student.courses.length >= 3) {
            return res.status(400).send({ message: 'No puedes estar en más de 3 cursos' });
        }

        student.courses.push(courseId);
        await student.save();

        res.status(200).send({ message: 'Curso asignado correctamente', student });
    } catch (error) {
        console.error(' Error asignando curso:', error);
        res.status(500).send({ message: 'Error assigning course', err: error.message });
    }
};