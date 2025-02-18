import { Schema, model } from 'mongoose';

const CourseSchema = Schema(
    {
        name: {
            type: String, 
            required: [true, 'Name is required'],
            unique: true 
        },
        description: { 
            type: String, 
            required: [true, 'description is required'],
        },
        teacher: { 
            type: Schema.Types.ObjectId, 
            ref: 'Teacher', 
            required: [true, 'teacher is required'],
        },
    }, 
    { 
        versionKey: false,
        timestamps: true
    }
);
export default model('Course', CourseSchema);