import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: false,
        trim: true,
        match: /^\d{10,15}$/
    },
    message: {
        type: String,
        required: true
    }
})
const Contact = mongoose.model("Contact", contactSchema)
export default Contact;