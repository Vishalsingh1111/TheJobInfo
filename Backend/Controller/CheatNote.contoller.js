import Cheatnote from "../Modal/CheatNote.modal.js";

export const getCheatnote = async (req, res) => {
    try {
        const CheatnoteList = await Cheatnote.find(); // Renamed variable to avoid conflict
        res.status(200).json(CheatnoteList);
    } catch (error) {
        console.error("Error fetching job info:", error);
        res.status(500).json({ error: "Error fetching job info" });
    }
};

export const createCheatnote = async (req, res) => {
    try {
        const {
            id, header, text, statement, substatement1, substatement3, statement2, feature,
            substatement2, explain, note, image1, category, figtitle, link1, link2
        } = req.body;

        const newCheatnote = new Cheatnote({
            id,
            header,
            text,
            statement,
            substatement1,
            substatement3,
            statement2,
            feature,
            substatement2,
            explain,
            note,
            image1,
            category,
            figtitle,
            link1,
            link2
        });

        await newCheatnote.save();
        res.status(201).json({ message: "Created successfully", newCheatnote });
    } catch (error) {
        console.error("Error creating job info:", error);
        res.status(500).json({ error: "Error creating job info" });
    }
};

export const updateCheatnote = async (req, res) => {
    const { id } = req.params;
    const {
        header, text, statement, substatement1, substatement3, statement2, feature,
        substatement2, explain, note, image1, category, figtitle, link1, link2
    } = req.body;

    try {
        const updatedCheatnote = await Cheatnote.findByIdAndUpdate(
            id,
            {
                header, text, statement, substatement1, substatement3, statement2, feature,
                substatement2, explain, note, image1, category, figtitle, link1, link2
            },
            { new: true }
        );

        if (!updatedCheatnote) {
            return res.status(404).json({ error: "Job info not found" });
        }

        res.status(200).json({ message: "Content updated successfully", updatedCheatnote });
    } catch (error) {
        console.error("Error updating job info:", error);
        res.status(500).json({ error: "Error updating job info" });
    }
};

export const deleteCheatnote = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCheatnote = await Cheatnote.findByIdAndDelete(id);

        if (!deletedCheatnote) {
            return res.status(404).json({ error: "Job info not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting job info:", error);
        res.status(500).json({ error: "Error deleting job info" });
    }
};
