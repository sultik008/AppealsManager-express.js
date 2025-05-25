import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Завершено", "В работе", "Отменено" , "Новое"],
        default: "Новое",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    reason: {
        type: String,
        default: "",
        required: true,
    },
    solve:{
        type: String,
        default: "",
        required: true,
    }

})


export default mongoose.model("Todo", todoSchema);