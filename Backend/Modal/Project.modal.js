import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    id: { type: Number, required: true },
    header: { type: String, required: true },
    text: { type: String, required: false },
    statement: { type: String, required: false },
    substatement1: { type: String, required: false },
    substatement3: { type: String, required: false },
    code1: { type: String, required: true },
    code2: { type: String, required: false },
    code3: { type: String, required: false },
    code4: { type: String, required: false },
    statement2: { type: String, required: false },
    feature: { type: String, required: false },
    substatement2: { type: String, required: false },
    explain: { type: String, required: false },
    note: { type: String, required: false },
    image1: { type: String, required: false },
    image2: { type: String, required: false },
    image3: { type: String, required: false },
    image4: { type: String, required: false },
    category: { type: String, required: false },
    figtitle: { type: String, required: false },
    link1: { type: String, required: false },
    link2: { type: String, required: false }
});

projectSchema.index({ header: 'text', text: 'text', category: 'text', code1: 'text', code2: 'text', code3: 'text', code4: 'text' });

const Project = mongoose.model("Project", projectSchema);
export default Project;
