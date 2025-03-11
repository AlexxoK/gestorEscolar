import { response, request } from "express";
import { hash } from "argon2";
import Teacher from "./teacher.model.js";

export const getTeachers = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, teachers] = await Promise.all([
            Teacher.countDocuments(query),
            Teacher.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            teachers
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting users!',
            error
        })
    }
}