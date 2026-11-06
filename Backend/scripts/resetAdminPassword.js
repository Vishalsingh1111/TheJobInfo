import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Admin from "../Modal/Admin.modal.js";

dotenv.config();

const uri = process.env.MONGO_URI || process.env.MongoDBURI;
if (!uri) throw new Error("Set MONGO_URI before resetting an admin password");

const prompt = readline.createInterface({ input, output });
try {
    await mongoose.connect(uri);
    const admins = await Admin.find().select("username").sort({ username: 1 }).lean();
    if (!admins.length) throw new Error("No admin accounts exist. Run npm run create:admin first.");

    console.log("Admin usernames:");
    admins.forEach(({ username }) => console.log(`- ${username}`));

    const username = (await prompt.question("Username to reset: ")).trim();
    const admin = admins.find((entry) => entry.username === username);
    if (!admin) throw new Error("That username was not found");

    const password = await prompt.question("New admin password (12+ characters): ");
    if (password.length < 12 || password.length > 200) {
        throw new Error("Password must be between 12 and 200 characters");
    }

    await Admin.updateOne(
        { _id: admin._id },
        { $set: { password: await bcrypt.hash(password, 12) } }
    );
    console.log(`Password reset for ${username}.`);
} finally {
    prompt.close();
    await mongoose.disconnect();
}
