import { Request, Response } from "express";
import mongoose from "mongoose";
import task from "../models/taskModel.js";
import classSched from "../models/classModel.js";

const timeFormatter = (timeString: string): Date => {
  return new Date(`01/01/1970 ${timeString}:00`);
};

// GET Request  to provide all the schedules of user
export const getSchedules = async (req: Request, res: Response) => {
  try {
    const userID: any = req.user?._id;

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

    const schedules = await Promise.all([allTasks, allClasses]);

    res.json({ Tasks: schedules[0], Classes: schedules[1] });
  } catch (error: any) {
    res.status(400).json({ Error: error });
  }
};

// POST Request to add new tasks
export const postTask = async (req: Request, res: Response) => {
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
      user: req.user?._id,
    };

    const savedTask = await task.create(newTask);

    setTimeout(() => {
      res.json(savedTask);
    }, 5000);
  } catch (error: any) {
    res.status(400).json({ Error: error.name });
  }
};

export const postClass = async (req: Request, res: Response) => {
  try {
    const { className, description, daySchedule, timeStart, timeEnd } =
      req.body;
    if ([className, daySchedule, timeStart, timeEnd].some((item) => !item))
      throw Error("All required fields must be filled");

    if (
      String(timeFormatter(timeStart)) === "Invalid Date" ||
      String(timeFormatter(timeEnd)) === "Invalid Date"
    )
      throw Error("Invalid Time");

    if (timeFormatter(timeStart) >= timeFormatter(timeEnd))
      throw Error("Invalid Time Schedule");

    const allClass = await classSched.find({
      $and: [{ user: req.user?._id, daySchedule: daySchedule }],
    });

    // Check the availability of time range
    if (allClass.length > 0) {
      allClass.forEach((eachClass) => {
        const checkTimeStart =
          timeFormatter(timeStart) >= timeFormatter(eachClass.timeStart) &&
          timeFormatter(timeStart) <= timeFormatter(eachClass.timeEnd);
        const checkTimeEnd =
          timeFormatter(timeEnd) >= timeFormatter(eachClass.timeStart) &&
          timeFormatter(timeEnd) <= timeFormatter(eachClass.timeEnd);

        const checkTimeRange =
          timeFormatter(timeStart) <= timeFormatter(eachClass.timeStart) &&
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
      user: req.user?._id,
    };

    const savedClass = await classSched.create(newClass);
    res.status(200).json(savedClass);
  } catch (error: any) {
    return res.status(400).json({ Error: error.message });
  }
};
