import mongoose from "mongoose";

const visitorCountSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true },
    count: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const VisitorCount = mongoose.model("VisitorCount", visitorCountSchema);
export default VisitorCount;
