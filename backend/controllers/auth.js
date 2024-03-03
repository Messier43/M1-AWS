import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (request, response) => {
    try {
        console.log(request.body)

        const newUser = new User({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password
        })
        await newUser.save();
        response.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const login = async (request, response) => {
    try {
        const { email, password } = request.body
        const user = await User.findOne({ email, password });
        if (!user) {
            response.status(400).json({ message: "Wrong email and/or password" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log(token);
        response.status(200).json({ message: `Welcome ${user.firstName}`, user, token });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

