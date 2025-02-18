import Course from './course.model.js'

export const createCourse = async (req, res) => {
    try {
        console.log('Usuario autenticado:', req.user); 

        const { name, description } = req.body;
        const teacherId = req.user.id;

        if (req.user.role !== 'TEACHER_ROLE') {
            return res.status(403).send({ message: 'Solo los profesores pueden crear cursos' });
        }

        const newCourse = new Course({ name, description, teacher: teacherId });
        await newCourse.save();

        res.status(201).send({ message: 'Curso creado exitosamente', course: newCourse });
    } catch (error) {
        console.error('Error en createCourse:', error);
        res.status(500).send({ message: 'Error creando el curso', error });
    }
};

export const getCoursesByTeacher = async (req, res) => {
    try {
        const teacherId = req.user.uid;
        const courses = await Course.find({ teacher: teacherId });

        return res.send({ message: 'Courses found', courses });
    } catch (err) {
        return res.status(500).send({ message: 'Error fetching courses', err });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const teacherId = req.user.uid;
        const { name, description } = req.body;

        const course = await Course.findOne({ _id: id, teacher: teacherId });
        if (!course) {
            return res.status(404).send({ message: 'Course not found or unauthorized' });
        }

        course.name = name || course.name;
        course.description = description || course.description;
        await course.save();

        return res.send({ message: 'Course updated successfully', course });
    } catch (err) {
        return res.status(500).send({ message: 'Error updating course', err });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const teacherId = req.user.uid;

        const course = await Course.findOneAndDelete({ _id: id, teacher: teacherId });
        if (!course) {
            return res.status(404).send({ message: 'Course not found or unauthorized' });
        }

        await Student.updateMany(
            { courses: id },
            { $pull: { courses: id } }
        );

        return res.send({ message: 'Course deleted successfully and students unassigned' });
    } catch (err) {
        return res.status(500).send({ message: 'Error deleting course', err });
    }
};