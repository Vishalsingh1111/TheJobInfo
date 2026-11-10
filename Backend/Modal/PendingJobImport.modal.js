import mongoose from "mongoose";

const pendingJobImportSchema = new mongoose.Schema({
    externalId: { type: String, required: true, unique: true },
    sourceData: { type: mongoose.Schema.Types.Mixed, required: true },
    generatedContent: { type: mongoose.Schema.Types.Mixed, required: false },
    retryAt: { type: Date, required: true, default: Date.now, index: true },
    attempts: { type: Number },
    lastError: { type: String, required: false },
}, { timestamps: true });

export default mongoose.model("PendingJobImport", pendingJobImportSchema);
