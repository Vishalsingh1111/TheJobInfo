import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Admin from "../Modal/Admin.modal.js";

dotenv.config();
const uri = process.env.MONGO_URI || process.env.MongoDBURI;
if (!uri) throw new Error("Set MONGO_URI before creating an admin");

const prompt = readline.createInterface({ input, output });
try {
    const username = (await prompt.question("Admin username: ")).trim();
    const password = await prompt.question("Admin password (12+ characters): ");
    if (!username || username.length > 100 || password.length < 12 || password.length > 200) {
        throw new Error("Username and password must meet the length requirements");
    }

    await mongoose.connect(uri);
    if (await Admin.exists({ username })) throw new Error("That admin username already exists");
    await Admin.create({ username, password: await bcrypt.hash(password, 12) });
    console.log("Admin account created.");
} finally {
    prompt.close();
    await mongoose.disconnect();
}
