import Teacher from './teacher.model.js';

export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;
        const teachers = await Teacher.find().skip(skip).limit(limit);

        if (teachers.length === 0) return res.status(404).send({ message: 'Teachers not found', success: false });

        return res.send({ success: true, message: 'Teachers found', teachers, total: teachers.length });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'General error', err });
    }
};

    export const update = async (req, res) => {
        try {
            let teacherId = req.params.id;
            let data = req.body;
    
            if (data.password) delete data.password;
    
            let updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, data, { new: true });
    
            if (!updatedTeacher) {
                return res.status(404).send({ message: 'Teacher not found' });
            }
    
            return res.send({ message: 'Teacher updated successfully', updatedTeacher });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: 'General error updating teacher', err });
        }
    };
    

export const remove = async (req, res) => {
    try {
        let teacherId = req.params.id;
        let deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

        if (!deletedTeacher) return res.status(404).send({ message: 'Teacher not found' });

        return res.send({ message: 'Teacher deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error deleting teacher' });
    }
};