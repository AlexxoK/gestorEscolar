import { Router } from "express";
import { check } from "express-validator";
import { createCourse, updateCourse, deleteCourse, getCoursesByTeacherId } from "./course.controller.js";
import { existeCourseById, existeTeacherById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarTeacherJWT } from "../middlewares/validar-jwt.js";
import { tieneRoleTeacher } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/createCourse",
    [
        validarTeacherJWT,
        tieneRoleTeacher("TEACHER_ROLE"),
        validarCampos
    ],
    createCourse
)

router.put(
    "/updateCourse/:id",
    [
        validarTeacherJWT,
        tieneRoleTeacher("TEACHER_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeCourseById),
        validarCampos
    ],
    updateCourse
)

router.delete(
    "/deleteCourse/:id",
    [
        validarTeacherJWT,
        tieneRoleTeacher("TEACHER_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeCourseById),
        validarCampos
    ],
    deleteCourse
)

router.get(
    "/getCoursesByTeacherId/:id",
    [
        validarTeacherJWT,
        tieneRoleTeacher("TEACHER_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeTeacherById),
        validarCampos
    ],
    getCoursesByTeacherId
)

export default router;