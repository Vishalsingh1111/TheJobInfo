
import Newslatter from "../Modal/Newslatter.modal.js";

export const subscribeNewslatter = async (req, res) => {
    try {
        const email = String(req.body.email || '').trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
            return res.status(400).json({ message: "A valid email is required" });
        }

        // Check if email already exists
        const existingSubscription = await Newslatter.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ message: "Already Subscribed!" });
        }

        // Create new subscription
        const newSubscription = new Newslatter({ email });
        await newSubscription.save();

        res.status(201).json({ message: "Thanks for subscribing!" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Unable to subscribe right now" });
    }
};

// Get all subscriber details
export const getsubscribeNewslatter = async (req, res) => {
    try {
        const subscribers = await Newslatter.find();
        res.status(200).json(subscribers);
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        res.status(500).json({ error: "Error fetching subscribers" });
    }
};

export const getSubscriberCount = async (_req, res) => {
    try {
        const count = await Newslatter.countDocuments();
        return res.status(200).json({ count });
    } catch (error) {
        console.error("Error counting subscribers:", error);
        return res.status(500).json({ error: "Unable to fetch subscriber count" });
    }
};

// Delete a subscriber by email (passed as URL param)
export const deletesubscriber = async (req, res) => {
    const { email } = req.params; // ✅ Matches route: DELETE /newslatter/:email

    try {
        const deletedUser = await Newslatter.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ error: "Subscriber not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting subscriber:", error);
        res.status(500).json({ error: "Error deleting subscriber" });
    }
};