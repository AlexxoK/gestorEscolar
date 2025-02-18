import { Schema, model } from 'mongoose';

const StudentSchema = Schema(
    {
        name: { 
            type: String, 
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        surname: { 
            type: String, 
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
        },
        username: { 
            type: String, 
            required: [true, 'Username is required'],
            unique: true,
            maxLength: [15, `Can't be overcome 15 characters`],
        },
        email: { 
            type: String, 
            required: [true, 'Email is required'], 
            unique: true 
        },
        password: { 
            type: String, 
            required: true,
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Can't be overcome 100 characters`],
        },
        phone: { 
            type: String, 
            required: true, 
            minLength: [8, 'Phone must be 8 numbers'],
            maxLength: [13, `Can't be overcome 8 numbers`]
        },
        role: { 
            type: String, 
            required: [true, 'Role is required'],
            enum: ['STUDENT_ROLE'], 
            default: 'STUDENT_ROLE' 
        },
        status: { 
            type: Boolean, 
            required: true, 
            default: true 
        },
        courses: [{
            type: Schema.Types.ObjectId, 
            ref: 'Course'
        }]

    }, 
        { 
            versionKey: false,
            timestamps: true
        }
);

export default model('Student', StudentSchema);