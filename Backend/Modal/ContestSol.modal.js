// import mongoose from "mongoose";

// const ContestSchema = mongoose.Schema({
//     id: { type: Number, required: true, unique: true },  // Ensure 'id' is unique
//     header: { type: String, required: false },
//     code: { type: String, required: false },
//     explanation: { type: String, required: false },
//     code2: { type: String, required: false },
//     explanation2: { type: String, required: false },
//     code3: { type: String, required: false },
//     explanation3: { type: String, required: false },
//     code4: { type: String, required: false },
//     explanation4: { type: String, required: false },
//     code5: { type: String, required: false },
//     explanation5: { type: String, required: false },
//     image: { type: String, required: false },
//     category: { type: String, required: true }
// });

// // Text index for searching by multiple fields
// ContestSchema.index({ header: 'text', code: 'text', explanation: 'text', category: 'text' });

// const Contest = mongoose.model("contest", ContestSchema);
// export default Contest;

import mongoose from "mongoose";

const ContestSchema = mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        header: { type: String, required: false },
        code: { type: String, required: false },
        explanation: { type: String, required: false },
        code2: { type: String, required: false },
        explanation2: { type: String, required: false },
        code3: { type: String, required: false },
        explanation3: { type: String, required: false },
        code4: { type: String, required: false },
        explanation4: { type: String, required: false },
        code5: { type: String, required: false },
        explanation5: { type: String, required: false },
        image: { type: String, required: false },
        category: { type: String, required: true }
    },
    { timestamps: true } // ✅ Enables createdAt and updatedAt automatically
);

// Text index for searching
ContestSchema.index({ header: 'text', code: 'text', explanation: 'text', category: 'text' });

const Contest = mongoose.model("contest", ContestSchema);
export default Contest;
