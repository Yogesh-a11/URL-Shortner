import User from "../models/userModel.js"
import {v4 as uuidv4} from 'uuid'
import { getUser, setUser } from "../service/authService.js"

export const handleUserSignup = async(req, res) => {
    const { name, email, password } = req.body

    await User.create({
        name,
        email,
        password
    })

    return res.redirect('/')
}

export const handleUserLogin = async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid password" })

    }

    const sessionId = uuidv4()
    setUser(sessionId, user)
    res.cookie('uuid', sessionId)
    return res.redirect('/')
}