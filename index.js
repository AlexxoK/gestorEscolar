import { config } from 'dotenv';
import { initServer, createTeacher, createStudent, createDefaultCourse } from './configs/server.js';

config();

const initializeServer = async () => {

    await initServer();
    await createTeacher();
    await createStudent();
    createDefaultCourse();

};

initializeServer();