import Blog from "../Modal/Blog.modal.js";

export const getBlog = async (req, res) => {
    try {
        const blog = await Blog.find();
        res.status(200).json(blog);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json(error);
    }
};

export const createBlog = async (req, res) => {
    try {
        const { id, header, code, image, code2, explanation2, code3, explanation3, explanation, category } = req.body;
        const newBlog = new Blog({
            id,
            header,
            code,
            explanation,
            code2,
            explanation2,
            code3,
            explanation3,
            category,
            image,
        });
        await newBlog.save();
        res.status(201).json({ message: "Created successfully" });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ error: "Error creating note" });
    }
};

// Update a note by ID
export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { header, code, explanation, code2, explanation2, code3, explanation3, image, category } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { header, code, explanation, code2, explanation2, code3, explanation3, image, category },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json({ message: "Updated successfully", updatedBlog });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Error updating note" });
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        // Validate if the ID is valid
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Error deleting note" });
    }
};
