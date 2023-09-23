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
export const postSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!mongoose.Types.ObjectId.isValid(userID))
            return res.status(401).json({ Error: "Unauthorized User" });
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
// POST Request to add a new task
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
        res.json(savedTask);
    }
    catch (error) {
        res.status(400).json({ Error: error.name });
    }
});
// PATCH Request to update a new task
export const patchTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskID = req.params.id;
        const { taskName, description, deadline, type, subject } = req.body;
        if (!mongoose.Types.ObjectId.isValid(taskID) || !taskID)
            return res.status(400).json({ Error: "Task does not exist" });
        if ([taskName, deadline, type, subject].some((item) => !item)) {
            return res
                .status(400)
                .json({ Error: "All required fields must be filled" });
        }
        const updatedTask = {
            taskName,
            description,
            deadline,
            type,
            subject,
        };
        const patchedTask = yield task.findByIdAndUpdate(taskID, updatedTask, {
            new: true,
            runValidators: true,
        });
        if (!patchedTask)
            return res.status(400).json({ Error: "Task does not exist" });
        return res.json(patchedTask);
    }
    catch (error) {
        res.status(400).json({ Error: error.name });
    }
});
// DELETE Request to delete a new task
export const patchDeleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskID = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(taskID) || !taskID)
            return res.status(400).json({ Error: "Task does not exist" });
        const deletedTask = yield task.findByIdAndDelete(taskID);
        if (!deletedTask)
            return res.status(400).json({ Error: "Task does not exist" });
        return res.json(deletedTask);
    }
    catch (error) {
        return res.status(400).json({ Error: error.name });
    }
});
// POST Request to add a new class
export const postClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { className, description, daySchedule, timeStart, timeEnd } = req.body;
        if ([className, daySchedule, timeStart, timeEnd].some((item) => !item))
            throw Error("All required fields must be filled");
        if (String(timeFormatter(timeStart)) === "Invalid Date" ||
            String(timeFormatter(timeEnd)) === "Invalid Date")
            throw Error("Invalid Time Schedule");
        if (timeFormatter(timeStart) >= timeFormatter(timeEnd))
            throw Error("Invalid Time Schedule");
        const allClass = yield classSched.find({
            $and: [{ user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id, daySchedule: daySchedule }],
        });
        // Check the availability of time range
        if (allClass.length > 0) {
            allClass.forEach((eachClass) => {
                const checkTimeStart = timeFormatter(timeStart) > timeFormatter(eachClass.timeStart) &&
                    timeFormatter(timeStart) < timeFormatter(eachClass.timeEnd);
                const checkTimeEnd = timeFormatter(timeEnd) > timeFormatter(eachClass.timeStart) &&
                    timeFormatter(timeEnd) < timeFormatter(eachClass.timeEnd);
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
// PATCH Request to update a class
export const patchClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const { className, description, daySchedule, timeStart, timeEnd } = req.body;
        const classID = req.params.id;
        // Check if class ID is valid
        if (!mongoose.Types.ObjectId.isValid(classID))
            return res.status(400).json({ Error: "Class does not exist" });
        // Check if there is no missing required fields
        if ([className, daySchedule, timeStart, timeEnd].some((item) => !item))
            return res
                .status(400)
                .json({ Error: "All required fields must be filled" });
        // Check if time schedule range is valid
        if (String(timeFormatter(timeStart)) === "Invalid Date" ||
            String(timeFormatter(timeEnd)) === "Invalid Date")
            throw Error("Invalid Time Schedule");
        if (timeFormatter(timeStart) >= timeFormatter(timeEnd))
            throw Error("Invalid Time Schedule");
        const allClass = yield classSched.find({
            $and: [
                {
                    user: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id,
                    daySchedule: daySchedule,
                    _id: { $ne: classID },
                },
            ],
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
        const classObject = {
            className,
            description,
            daySchedule,
            timeStart,
            timeEnd,
        };
        const updatedClass = yield classSched.findByIdAndUpdate(classID, classObject, { new: true });
        if (!updatedClass)
            throw Error("Class does not exist");
        res.status(200).json(updatedClass);
    }
    catch (error) {
        res.status(400).json({ Error: error.message });
    }
});
export const patchDeleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = req.params.id;
        // Check if the class ID is valid
        if (!mongoose.Types.ObjectId.isValid(classID) || !classID)
            throw Error("Task does not exist");
        const deletedClass = yield classSched.findByIdAndDelete(classID);
        // Check if deleted class is empty
        if (!deletedClass)
            throw Error("Task does not exist");
        res.json(deletedClass);
    }
    catch (error) {
        res.status(400).json({ Error: error.message });
    }
});
