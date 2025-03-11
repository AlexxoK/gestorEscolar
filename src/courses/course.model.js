import { Schema, model } from "mongoose";

const CourseSchema = Schema({
    name: {
        type: String,
        required: [true, "The course name is required!"],
        maxLength: 50,
    },

    description: {
        type: String,
        maxLength: [500, "500 characters maximun!"],
    },

    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, "The teacher is required!"],
    },

    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }],

}, {
    timestamps: true,
    versionKey: false
});

export default model('Course', CourseSchema);