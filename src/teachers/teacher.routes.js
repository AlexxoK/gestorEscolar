import { Router } from "express";
import {  } from "../helpers/db-validator.js";
import {  } from "../middlewares/validar-jwt.js";
import { getTeachers } from "./teacher.controller.js";

const router = Router();

router.get("/", getTeachers);

export default router;