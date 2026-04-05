// import Newslatter from "../Modal/Newslatter.modal.js";

// export const subscribeNewslatter = async (req, res) => {
//     try {
//         const { email } = req.body;
//         if (!email) {
//             return res.status(400).json({ message: "Email is required" });
//         }

//         // Check if email already exists
//         const existingSubscription = await Newslatter.findOne({ email });
//         if (existingSubscription) {
//             return res.status(400).json({ message: "Already Subscribed!" });
//         }

//         // Create new subscription
//         const newSubscription = new Newslatter({ email });
//         await newSubscription.save();

//         res.status(201).json({ message: "Thanks for subscribe!" });
//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };


// //get Subscriber deatils
// export const getsubscribeNewslatter = async (req, res) => {
//     try {
//         const message = await Newslatter.find();
//         res.status(200).json(message);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).json({ error: "Error fetching users" });
//     }
// };

// //delete a user
// export const deletesubscriber = async (req, res) => {
//     const { email } = req.body; // Use email from request body

//     try {
//         const deletedUser = await Newslatter.findOneAndDelete({ email });

//         if (!deletedUser) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.status(200).json({ message: "Deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting User:", error);
//         res.status(500).json({ error: "Error deleting User" });
//     }
// };

import Newslatter from "../Modal/Newslatter.modal.js";

export const subscribeNewslatter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
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
        res.status(500).json({ message: error.message });
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