import { Schema, model } from "mongoose";

const StudentSchema = Schema({
    name: {
        type: String,
        required: [true, "The name is required!"],
        maxLength: 25,
    },

    surname: {
        type: String,
        required: [true, "The surname is required!"],
        maxLength: 25,
    },

    username: {
        type: String,
        unique: true,
    },

    email: {
        type: String,
        required: [true, "The email is required!"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "The password is required!"],
        minLength: 8,
    },

    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, "The phone is required!"],
    },

    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
    }],

    role: {
        type: String,
        default: "STUDENT_ROLE",
    },

    estado: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
        versionKey: false,
    });

export default model("Student", StudentSchema);