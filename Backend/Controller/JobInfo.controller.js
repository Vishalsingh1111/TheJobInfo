import JobInfo from "../Modal/JobInfo.modal.js";

export const getJobInfo = async (req, res) => {
    try {
        const jobInfoList = await JobInfo.find(); // Renamed variable to avoid conflict
        res.status(200).json(jobInfoList);
    } catch (error) {
        console.error("Error fetching job info:", error);
        res.status(500).json({ error: "Error fetching job info" });
    }
};

export const createJobInfo = async (req, res) => {
    try {
        const {
            id, header, text, statement, substatement1, substatement3, statement2, feature,
            substatement2, explain, note, image1, category, figtitle, link1, link2
        } = req.body;

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
        res.status(201).json({ message: "Created successfully", newJobInfo });
    } catch (error) {
        console.error("Error creating job info:", error);
        res.status(500).json({ error: "Error creating job info" });
    }
};

export const updateJobInfo = async (req, res) => {
    const { id } = req.params;
    const {
        header, text, statement, substatement1, substatement3, statement2, feature,
        substatement2, explain, note, image1, category, figtitle, link1, link2
    } = req.body;

    try {
        const updatedJobInfo = await JobInfo.findByIdAndUpdate(
            id,
            {
                header, text, statement, substatement1, substatement3, statement2, feature,
                substatement2, explain, note, image1, category, figtitle, link1, link2
            },
            { new: true }
        );

        if (!updatedJobInfo) {
            return res.status(404).json({ error: "Job info not found" });
        }

        res.status(200).json({ message: "Content updated successfully", updatedJobInfo });
    } catch (error) {
        console.error("Error updating job info:", error);
        res.status(500).json({ error: "Error updating job info" });
    }
};

export const deleteJobInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJobInfo = await JobInfo.findByIdAndDelete(id);

        if (!deletedJobInfo) {
            return res.status(404).json({ error: "Job info not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting job info:", error);
        res.status(500).json({ error: "Error deleting job info" });
    }
};
