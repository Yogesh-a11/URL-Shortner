import { getUser } from "../service/authService.js"

export const authorizeUser = (req, res, next) => {
    const userUid = req.cookies.uuid
    if (!userUid) {
        return res.redirect('/login')
    }
    const user = getUser(userUid)

    if (!user) {
        return res.redirect('/login')
    }

    req.user = user

    next()
}

export const checkAuth = async (req, res, next) => {
    const userUid = req.cookies.uuid

    const user = getUser(userUid)

    req.user = user

    next()
}