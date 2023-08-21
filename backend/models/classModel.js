import mongoose from "mongoose";
const Schema = mongoose.Schema;
const classSchema = new Schema({
    className: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    daySchedule: {
        type: String,
        required: true,
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
    },
    timeStart: {
        type: String,
        required: true,
    },
    timeEnd: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});
const classSched = mongoose.model("class", classSchema, "classes");
export default classSched;
