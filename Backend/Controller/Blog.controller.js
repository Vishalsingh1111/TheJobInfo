// import Blog from "../Modal/Blog.modal.js";

// export const getBlog = async (req, res) => {
//     try {
//         const blog = await Blog.find();
//         res.status(200).json(blog);
//     } catch (error) {
//         console.log("Error", error);
//         res.status(500).json(error);
//     }
// };

// export const createBlog = async (req, res) => {
//     try {
//         const { id, header, code, image, code2, explanation2, code3, explanation3, explanation, category } = req.body;
//         const newBlog = new Blog({
//             id,
//             header,
//             code,
//             explanation,
//             code2,
//             explanation2,
//             code3,
//             explanation3,
//             category,
//             image,
//         });
//         await newBlog.save();
//         res.status(201).json({ message: "Created successfully" });
//     } catch (error) {
//         console.error("Error creating note:", error);
//         res.status(500).json({ error: "Error creating note" });
//     }
// };

// // Update a note by ID
// export const updateBlog = async (req, res) => {
//     const { id } = req.params;
//     const { header, code, explanation, code2, explanation2, code3, explanation3, image, category } = req.body;

//     try {
//         const updatedBlog = await Blog.findByIdAndUpdate(
//             id,
//             { header, code, explanation, code2, explanation2, code3, explanation3, image, category },
//             { new: true }
//         );

//         if (!updatedBlog) {
//             return res.status(404).json({ error: "Note not found" });
//         }

//         res.status(200).json({ message: "Updated successfully", updatedBlog });
//     } catch (error) {
//         console.error("Error updating note:", error);
//         res.status(500).json({ error: "Error updating note" });
//     }
// };

// export const deleteBlog = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Validate if the ID is valid
//         if (!id) {
//             return res.status(400).json({ error: "Invalid ID" });
//         }

//         const deletedBlog = await Blog.findByIdAndDelete(id);

//         if (!deletedBlog) {
//             return res.status(404).json({ error: "Note not found" });
//         }

//         res.status(200).json({ message: "Deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting note:", error);
//         res.status(500).json({ error: "Error deleting note" });
//     }
// };


import Job from "../Modal/Blog.modal.js";

export const getJob = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ id: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json(error);
    }
};

export const createJob = async (req, res) => {
    try {
        const {
            id, title, company, location, salary, salaryNote, jobType, experience,
            category, website, applyLink, lastDate, aboutCompany, description,
            responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
            selectionProcess, benefits, applySteps
        } = req.body;

        const newJob = new Job({
            id, title, company, location, salary, salaryNote, jobType, experience,
            category, website, applyLink, lastDate, aboutCompany, description,
            responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
            selectionProcess, benefits, applySteps
        });

        await newJob.save();
        res.status(201).json({ message: "Created successfully" });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ error: "Error creating job" });
    }
};

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const {
        title, company, location, salary, salaryNote, jobType, experience,
        category, website, applyLink, lastDate, aboutCompany, description,
        responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
        selectionProcess, benefits, applySteps
    } = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            {
                title, company, location, salary, salaryNote, jobType, experience,
                category, website, applyLink, lastDate, aboutCompany, description,
                responsibilities, eligibility, requiredSkills, applyIf, dontApplyIf,
                selectionProcess, benefits, applySteps
            },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.status(200).json({ message: "Updated successfully", updatedJob });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ error: "Error updating job" });
    }
};

export const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ error: "Error deleting job" });
    }
};
