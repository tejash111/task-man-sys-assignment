import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "7d" })
}

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newlyCreateUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (newlyCreateUser) {
            const token = generateToken(newlyCreateUser?._id)

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(201).json({
                success: true,
                _id: newlyCreateUser._id,
                name: newlyCreateUser.name,
                email: newlyCreateUser.email,
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const getUser = await User.findOne({ email })
        if (!getUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const checkAuth = await bcrypt.compare(password, getUser.password)

        if (!checkAuth) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const token = generateToken(getUser?._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            _id: getUser._id,
            name: getUser.name,
            email: getUser.email,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProfile = async (req, res) => {
    res.json(req.user);
};

const logOut = async (req, res) => {
    res.cookie("token", "", {
        withCredentials: true,
        httpOnly: false,
    })

    return res.status(200).json({
        success: true,
        message: "logout successfully"
    })
}

export { logOut, loginUser, RegisterUser, getProfile }