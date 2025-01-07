import JobInfo from "../Modal/JobInfo.modal";

export const getJobInfo = async (req, res) => {
    try {
        const JobInfo = await JobInfo.find();
        res.status(200).json(JobInfo);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json(error);
    }
};

export const createJobInfo = async (req, res) => {
    try {
        const { id, header, text, statement, substatement1, substatement3, statement2, feature, substatement2, explain, note,
            image1, category, figtitle, link1, link2 } = req.body;
        const newJobInfo = new JobInfo({
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
        await newJobInfo.save();
        res.status(201).json({ message: "Created successfully" });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ error: "Error creating note" });
    }
};


// Update a note by ID
export const updateJobInfo = async (req, res) => {
    const { id } = req.params;
    const { header, text, statement, substatement1, substatement3, statement2, feature, substatement2, explain, note,
        image1, category, figtitle, link1, link2 } = req.body;

    try {
        const updatedJobInfo = await JobInfo.findByIdAndUpdate(
            id,
            {
                header, text, statement, substatement1, substatement3, statement2, feature, substatement2, explain, note,
                image1, category, figtitle, link1, link2
            },
            { new: true }
        );

        if (!updatedJobInfo) {
            return res.status(404).json({ error: "Content not found" });
        }

        res.status(200).json({ message: "Content Updated successfully", updatedJobInfo });
    } catch (error) {
        console.error("Error updating Content:", error);
        res.status(500).json({ error: "Error updating Content" });
    }
};

// Delete a note by ID
export const deleteJobInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJobInfo = await JobInfo.findByIdAndDelete(id);

        if (!deletedJobInfo) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Error deleting note" });
    }
};