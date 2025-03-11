import { Router } from "express";
import { check } from "express-validator";
import { studentInCourse, getStudentCourses, updateStudent, deleteStudent } from "./student.controller.js";
import { existeStudentById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarStudentJWT } from "../middlewares/validar-jwt.js";
import { tieneRoleStudent } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/studentInCourse",
    [
        validarStudentJWT,
        tieneRoleStudent("STUDENT_ROLE"),
        validarCampos
    ],
    studentInCourse
)

router.get("/getStudentCourses/:id", getStudentCourses);

router.put(
    "/updateStudent/:id",
    [
        validarStudentJWT,
        tieneRoleStudent("STUDENT_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeStudentById),
        validarCampos
    ],
    updateStudent
)

router.delete(
    "/deleteStudent/:id",
    [
        validarStudentJWT,
        tieneRoleStudent("STUDENT_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeStudentById),
        validarCampos
    ],
    deleteStudent
)

export default router;