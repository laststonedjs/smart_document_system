import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async(req, res) => {
    try {
        const { email, password } = req.body;

        // check existing user
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = new User({
            email,
            password: hashedPassword,
        })

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
}