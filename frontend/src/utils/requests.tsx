import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

type stateTypeBoolean = Dispatch<SetStateAction<boolean>>;
// type stateTypeString = Dispatch<SetStateAction<string>>;
// type stateTypeArray = Dispatch<SetStateAction<any[]>>;
interface userType {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  retypePassword: string;
}

// Sign Up User through POST Request
export const postSignUp = async (user: userType) => {
  try {
    const signUpUser = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const respond: any = await signUpUser.json();

    if (!signUpUser.ok) throw Error(respond.Error);

    console.log(respond);
  } catch (error: any) {
    console.log(error);
  }
};

// Sign In User through POST Request
export const postSignIn = async (
  username: HTMLInputElement,
  password: HTMLInputElement,
  setIsLoading: stateTypeBoolean,
  router: NextRouter
) => {
  try {
    setIsLoading(true);
    const signInUser = await fetch("http://localhost:5000/api/users/signin", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const respond: any = await signInUser.json();

    if (!signInUser.ok) throw Error(respond.Error);

    router.push("/home");
    setIsLoading(false);
    password.value = "";
    username.value = "";
  } catch (error: any) {
    console.log(error);
    setIsLoading(false);
  }
};

// Fetch all the schedules through GET request with authentication
export const getSchedules = async () => {
  try {
    const fetchedSchedules = await fetch(
      "http://localhost:5000/api/schedules",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const schedules = await fetchedSchedules.json();

    return schedules;
  } catch (error: any) {
    return error;
  }
};

export const postTask = async (
  taskName: string,
  deadline: string,
  type: string,
  subject: string,
  description: string
) => {
  try {
    const newTask = await fetch("http://localhost:5000/api/schedules/tasks", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        taskName,
        description,
        deadline,
        type,
        subject,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJSON = await newTask.json();

    return responseJSON;
  } catch (error: any) {
    return error;
  }
};

interface taskType {
  taskName: string;
  deadline: string;
  type: string;
  subject: string;
  description?: string;
}

export const updateTask = async (taskID: string, task: taskType) => {
  try {
    const updateTask = await fetch(
      `http://localhost:5000/api/schedules/tasks/${taskID}`,
      {
        method: "PATCH",
        body: JSON.stringify(task),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await updateTask.json();

    return responseJSON;
  } catch (error: any) {
    return error;
  }
};

export const deleteTask = async (taskID: string) => {
  try {
    const deleteTask = await fetch(
      `http://localhost:5000/api/schedules/tasks/${taskID}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await deleteTask.json();

    return responseJSON;
  } catch (error: any) {
    return error;
  }
};

export const postClass = async (
  className: string,
  description: string,
  daySchedule: string,
  timeStart: string,
  timeEnd: string
) => {
  try {
    const newClass = await fetch(
      "http://localhost:5000/api/schedules/classes",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          className,
          description,
          daySchedule,
          timeStart,
          timeEnd,
        }),
      }
    );

    const responseJSON = await newClass.json();

    return responseJSON;
  } catch (error: any) {
    return error;
  }
};

interface classType {
  className: string;
  description: string;
  daySchedule: string;
  timeStart: string;
  timeEnd: string;
}

export const updateClass = async (classID: string, classItem: classType) => {
  try {
    const updateClass = await fetch(
      `http://localhost:5000/api/schedules/classes/${classID}`,
      {
        method: "PATCH",
        body: JSON.stringify(classItem),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await updateClass.json();

    return responseJSON;
  } catch (error: any) {
    return error;
  }
};

export const deleteClass = async (classID: string) => {
  try {
    const deleteTask = await fetch(
      `http://localhost:5000/api/schedules/classes/${classID}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await deleteTask.json();

    return responseJSON;
  } catch (error: any) {
    return error;
  }
};
