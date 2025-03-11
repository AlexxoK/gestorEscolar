export const tieneRoleTeacher = (...roles) => {
    return (req, res, next) => {

        if (!req.teacher) {
            return res.status(500).json({
                success: false,
                msg: 'You want to verify a role without validating the token first!'
            })
        }

        if (!roles.includes(req.teacher.role)) {
            return res.status(401).json({
                success: false,
                msg: `Teacher dont autorizated, has rol ${req.teacher.role}, roles autorizated are ${roles}!`
            })
        }

        next();
    }
}

export const tieneRoleStudent = (...roles) => {
    return (req, res, next) => {

        if (!req.student) {
            return res.status(500).json({
                success: false,
                msg: 'You want to verify a role without validating the token first!'
            })
        }

        if (!roles.includes(req.student.role)) {
            return res.status(401).json({
                success: false,
                msg: `Student dont autorizated, has rol ${req.student.role}, roles autorizated are ${roles}!`
            })
        }

        next();
    }
}