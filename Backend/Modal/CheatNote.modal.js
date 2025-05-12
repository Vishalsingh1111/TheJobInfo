import mongoose from "mongoose";

const CheatnoteSchema = mongoose.Schema({
    id: { type: Number, required: true },
    header: { type: String, required: true },
    text: { type: String, required: false },
    statement: { type: String, required: false },
    substatement1: { type: String, required: false },
    substatement3: { type: String, required: false },
    statement2: { type: String, required: false },
    feature: { type: String, required: false },
    substatement2: { type: String, required: false },
    explain: { type: String, required: false },
    note: { type: String, required: false },
    image1: { type: String, required: false },
    category: { type: String, required: false },
    figtitle: { type: String, required: false },
    link1: { type: String, required: false },
    link2: { type: String, required: false }
});

CheatnoteSchema.index({ header: 'text', text: 'text' });

const Cheatnote = mongoose.model("Cheatnote", CheatnoteSchema);
export default Cheatnote;
