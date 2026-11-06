import Contact from "../Modal/Contact.modal.js";

export const contactInfo = async (req, res) => {
    try {
        const firstname = String(req.body.firstname || '').trim();
        const lastname = String(req.body.lastname || '').trim();
        const email = String(req.body.email || '').trim().toLowerCase();
        const phonenumber = String(req.body.phonenumber || '').trim();
        const message = String(req.body.message || '').trim();
        if (!firstname || firstname.length > 80 || !lastname || lastname.length > 80 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
            !message || message.length > 5000 ||
            (phonenumber && !/^\d{10,15}$/.test(phonenumber))) {
            return res.status(400).json({ message: "Please provide valid contact details and a message" });
        }
        const storedData = new Contact({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phonenumber: phonenumber || undefined,
            message: message,
        })
        await storedData.save();
        res.status(201).json({
            message: "Detail Submitted Successfully!"
        })
    } catch (error) {
        console.error("Contact submission failed:", error.message);
        res.status(500).json({ message: "Unable to submit your message right now" })
    }
}

//get user deatils
export const getMessage = async (req, res) => {
    try {
        const message = await Contact.find();
        res.status(200).json(message);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};