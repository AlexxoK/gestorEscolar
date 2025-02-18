'use strict'

import express from 'express'
import authRoutes from '../src/auth/auth.routes.js'
import courseRoutes from '../src/courses/course.routes.js';
import studentRoutes from '../src/student/student.routes.js';
import teacherRoutes from '../src/teacher/teacher.routes.js';

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
}

const routes = (app)=>{
    app.use('/api', authRoutes);
    app.use('/courses', courseRoutes);
    app.use('/students', studentRoutes);
    app.use('/teacher', teacherRoutes);
}

export const initServer = async()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}