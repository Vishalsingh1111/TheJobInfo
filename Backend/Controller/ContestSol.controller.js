

import Contest from "../Modal/ContestSol.modal.js";

// Get all contests
export const getContest = async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json(contests);
    } catch (error) {
        console.error("Error fetching contests:", error);
        res.status(500).json({ error: "Error fetching contests" });
    }
};

// Create a new contest
export const createContest = async (req, res) => {
    try {
        const {
            id,
            header,
            code,
            explanation,
            code2,
            explanation2,
            code3,
            explanation3,
            code4,
            explanation4,
            code5,
            explanation5,
            image,
            contestDate,
            contestTime,
            category
        } = req.body;

        const newContest = new Contest({
            id,
            header,
            code,
            explanation,
            code2,
            explanation2,
            code3,
            explanation3,
            code4,
            explanation4,
            code5,
            explanation5,
            image,
            contestDate,
            contestTime,
            category
        });

        await newContest.save();
        res.status(201).json({ message: "Contest created successfully" });
    } catch (error) {
        console.error("Error creating contest:", error);
        res.status(500).json({ error: "Error creating contest" });
    }
};

// Update a contest by MongoDB _id
export const updateContest = async (req, res) => {
    const { id } = req.params; // this is MongoDB _id, not contest `id` field

    const {
        header,
        code,
        explanation,
        code2,
        explanation2,
        code3,
        explanation3,
        code4,
        explanation4,
        code5,
        explanation5,
        image,
        contestDate,
        contestTime,
        category
    } = req.body;

    try {
        const updatedContest = await Contest.findByIdAndUpdate(
            id,
            {
                header,
                code,
                explanation,
                code2,
                explanation2,
                code3,
                explanation3,
                code4,
                explanation4,
                code5,
                explanation5,
                image,
                contestDate,
                contestTime,
                category
            },
            { new: true }
        );

        if (!updatedContest) {
            return res.status(404).json({ error: "Contest not found" });
        }

        res.status(200).json({ message: "Contest updated successfully", updatedContest });
    } catch (error) {
        console.error("Error updating contest:", error);
        res.status(500).json({ error: "Error updating contest" });
    }
};

// Delete a contest by MongoDB _id
export const deleteContest = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedContest = await Contest.findByIdAndDelete(id);

        if (!deletedContest) {
            return res.status(404).json({ error: "Contest not found" });
        }

        res.status(200).json({ message: "Contest deleted successfully" });
    } catch (error) {
        console.error("Error deleting contest:", error);
        res.status(500).json({ error: "Error deleting contest" });
    }
};
