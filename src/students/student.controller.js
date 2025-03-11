import Student from "./student.model.js";
import Course from "../courses/course.model.js";

export const studentInCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                msg: "Student not found!",
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                msg: "Course not found!",
            });
        }

        if (student.courses.includes(courseId)) {
            return res.status(400).json({
                success: false,
                msg: "Student is already enrolled in this course!",
            });
        }

        if (student.courses.length >= 3) {
            return res.status(400).json({
                success: false,
                msg: "Student can't be enrolled in more than 3 courses!",
            });
        }

        student.courses.push(courseId);
        await student.save();

        res.status(200).json({
            success: true,
            msg: "Student successfully enrolled in the course!",
            student,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error enrolling student!",
            error: error.message,
        });
    }
};

export const getStudentCourses = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id).populate("courses");

        if (!student) {
            return res.status(404).json({
                success: false,
                msg: "Student not found!",
            });
        }

        res.status(200).json({
            success: true,
            courses: student.courses,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error retrieving courses!",
            error: error.message,
        });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, phone } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, surname, email, phone },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, msg: "Student not found!" });
        }

        res.status(200).json({
            success: true,
            msg: "Profile updated successfully!",
            student: updatedStudent
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error updating profile!",
            error: error.message
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ success: false, msg: "Student not found!" });
        }

        res.status(200).json({
            success: true,
            msg: "Profile deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error deleting profile!",
            error: error.message
        });
    }
};