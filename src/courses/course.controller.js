import Course from './course.model.js';
import Teacher from '../teachers/teacher.model.js';
import Student from '../students/student.model.js';

export const createCourse = async (req, res) => {
    try {
        const { name, description, teacherId, students } = req.body;

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found!',
            });
        }

        const course = new Course({
            name,
            description,
            teacher: teacherId,
            students: students || [],
        });

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Course created successfully!',
            course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating course!',
            error: error.message,
        });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, teacherId, students } = req.body;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found!',
            });
        }

        if (teacherId) {
            const teacher = await Teacher.findById(teacherId);
            if (!teacher) {
                return res.status(404).json({
                    success: false,
                    message: 'Teacher not found!',
                });
            }
        }

        if (students && students.length > 0) {
            const existingStudents = await Student.find({ _id: { $in: students } });
            if (existingStudents.length !== students.length) {
                return res.status(404).json({
                    success: false,
                    message: 'One or more students not found!',
                });
            }
        }

        const currentStudents = course.students;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { name, description, teacher: teacherId, students },
            { new: true }
        );

        if (students) {
            const removedStudents = currentStudents.filter(
                (studentId) => !students.includes(studentId.toString())
            );

            const addedStudents = students.filter(
                (studentId) => !currentStudents.includes(studentId.toString())
            );

            if (removedStudents.length > 0) {
                await Student.updateMany(
                    { _id: { $in: removedStudents } },
                    { $pull: { courses: id } }
                );
            }

            if (addedStudents.length > 0) {
                await Student.updateMany(
                    { _id: { $in: addedStudents } },
                    { $addToSet: { courses: id } }
                );
            }
        }

        res.status(200).json({
            success: true,
            message: 'Course updated successfully!',
            course: updatedCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating course!',
            error: error.message,
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found!',
            });
        }

        const defaultCourse = await Course.findOne({ name: "Alumnos sin curso" });
        if (!defaultCourse) {
            return res.status(404).json({
                success: false,
                message: 'Default course not found!',
            });
        }

        if (course.students && course.students.length > 0) {
            await Student.updateMany(
                { _id: { $in: course.students } },
                { $pull: { courses: id }, $addToSet: { courses: defaultCourse._id } }
            );

            defaultCourse.students.push(...course.students);
            await defaultCourse.save();
        }

        await Course.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting course!',
            error: error.message,
        });
    }
};

export const getCoursesByTeacherId = async (req, res) => {
    try {
        const { id } = req.params;

        const courses = await Course.find({ teacher: id });

        if (!courses.length) {
            return res.status(404).json({
                success: false,
                msg: "No courses found for this teacher!",
            });
        }

        res.status(200).json({
            success: true,
            courses,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error getting courses!",
            error: error.message,
        });
    }
};