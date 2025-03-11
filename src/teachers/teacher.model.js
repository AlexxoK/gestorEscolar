import { Schema, model } from "mongoose";

const TeacherSchema = Schema({
    name: {
        type: String,
        required: [true, "The name is required!"],
        maxLenght: 25,
    },

    surname: {
        type: String,
        required: [true, "The name is required!"],
        maxLenght: [25, "25 characters maximun!"],
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
        minLenght: [8, "8 minumun characters!"],
    },

    phone: {
        type: String,
        minLenght: 8,
        maxLenght: 8,
        required: [true, "The phone is required!"],
    },

    role: {
        type: String,
        default: "TEACHER_ROLE",
    },

    estado: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
        versionkey: false
    }
);

TeacherSchema.methods.toJSON = function () {
    const { _v, password, _id, ...teacher } = this.toObject();
    teacher.uid = _id;
    return teacher;
}

export default model('Teacher', TeacherSchema);