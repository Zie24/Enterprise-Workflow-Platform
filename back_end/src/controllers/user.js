const bcrypt = require("bcryptjs");
const User = require("../models/user");

const createUser = async (req, res) => {
    try {
        const { name, email, password, role, department } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const user = await User.create({//mongoDB بيكلم ال model 
            name,
            email,
            password: hashedPassword,
            role,
            department
        });

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create user"
        });
    }
};


const getEmployees = async (req, res) => {
    try {

        const employees = await User.find({
            role: "employee",
            isActive: true
        })
        .select("_id name email department role");

        res.status(200).json({
            count: employees.length,
            employees
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to load employees"
        });

    }
};


module.exports = {
    createUser,
    getEmployees
};