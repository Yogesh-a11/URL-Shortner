import User from "../models/userModel.js"

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

    return res.redirect('/')
}