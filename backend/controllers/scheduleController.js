var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import task from "../models/taskModel.js";
import classSched from "../models/classModel.js";
const timeFormatter = (timeString) => {
    return new Date(`01/01/1970 ${timeString}:00`);
};
// GET Request  to provide all the schedules of user
export const getSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!mongoose.Types.ObjectId.isValid(userID))
            return res.status(401).json({ Error: "Unauthorized User" });
        const classProperties = [
            "_id",
            "className",
            "description",
            "daySchedule",
            "timeStart",
            "timeEnd",
        ];
        const allTasks = task
            .find({ user: userID })
            .select(["-user", "-__v"])
            .sort({ deadline: 1 });
        const allClasses = classSched
            .find({ user: userID })
            .select(["-user", "-__v"]);
        const schedules = yield Promise.all([allTasks, allClasses]);
        res.json({ Tasks: schedules[0], Classes: schedules[1] });
    }
    catch (error) {
        res.status(400).json({ Error: error });
    }
});
// POST Request to add new tasks
export const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { taskName, description, deadline, type, subject } = req.body;
        if ([taskName, deadline, type, subject].some((item) => !item))
            return res
                .status(400)
                .json({ Error: "All required fields must be filled" });
        if (!Date.parse(deadline))
            return res.status(400).json({ Error: "Invalid Date" });
        const newTask = {
            taskName,
            description,
            deadline,
            type,
            subject,
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
        };
        const savedTask = yield task.create(newTask);
        setTimeout(() => {
            res.json(savedTask);
        }, 5000);
    }
    catch (error) {
        res.status(400).json({ Error: error.name });
    }
});
export const postClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { className, description, daySchedule, timeStart, timeEnd } = req.body;
        if ([className, daySchedule, timeStart, timeEnd].some((item) => !item))
            throw Error("All required fields must be filled");
        if (String(timeFormatter(timeStart)) === "Invalid Date" ||
            String(timeFormatter(timeEnd)) === "Invalid Date")
            throw Error("Invalid Time");
        if (timeFormatter(timeStart) >= timeFormatter(timeEnd))
            throw Error("Invalid Time Schedule");
        const allClass = yield classSched.find({
            $and: [{ user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id, daySchedule: daySchedule }],
        });
        // Check the availability of time range
        if (allClass.length > 0) {
            allClass.forEach((eachClass) => {
                const checkTimeStart = timeFormatter(timeStart) >= timeFormatter(eachClass.timeStart) &&
                    timeFormatter(timeStart) <= timeFormatter(eachClass.timeEnd);
                const checkTimeEnd = timeFormatter(timeEnd) >= timeFormatter(eachClass.timeStart) &&
                    timeFormatter(timeEnd) <= timeFormatter(eachClass.timeEnd);
                const checkTimeRange = timeFormatter(timeStart) <= timeFormatter(eachClass.timeStart) &&
                    timeFormatter(timeEnd) >= timeFormatter(eachClass.timeEnd);
                if (checkTimeStart || checkTimeEnd || checkTimeRange) {
                    throw Error("Time Schedule is unavailable");
                }
            });
        }
        const newClass = {
            className,
            description,
            daySchedule,
            timeStart,
            timeEnd,
            user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
        };
        const savedClass = yield classSched.create(newClass);
        res.status(200).json(savedClass);
    }
    catch (error) {
        return res.status(400).json({ Error: error.message });
    }
});
