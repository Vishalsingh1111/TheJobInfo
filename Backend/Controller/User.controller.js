import User from '../Modal/User.modal.js';
import bcryptjs from 'bcryptjs';

// Signup Function
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const userbymail = await User.findOne({ email });
        if (userbymail) {
            return res.status(400).json({ message: "User already exists" });
        }

        const userbyphone = await User.findOne({ phone });
        if (userbyphone) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hashing password for more security
        const hashpassword = await bcryptjs.hash(password, 10);

        const createdUser = new User({
            firstName: firstName || "null",
            lastName: lastName || "null",
            email: email,
            phone: phone || "null",
            password: hashpassword,
            googleId: "null",
            photo: "null"
        });

        await createdUser.save();
        res.status(201).json({
            message: "User Created Successfully",
            user: {
                _id: createdUser._id,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                email: createdUser.email,
                phone: createdUser.phone,
                // password: createdUser.password,
                // googleId: createdUser.googleId,
                photo: createdUser.photo
            }
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login Function
export const login = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        const user = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Login Successful",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                // password: user.password,
                // googleId: user.googleId,
                photo: user.photo
            }
        });

    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get user details
export const userdetails = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting User:", error);
        res.status(500).json({ error: "Error deleting User" });
    }
};
