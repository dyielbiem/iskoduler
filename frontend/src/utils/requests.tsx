import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

type stateTypeBoolean = Dispatch<SetStateAction<boolean>>;
type stateTypeString = Dispatch<SetStateAction<string>>;
type stateTypeArray = Dispatch<SetStateAction<any[]>>;
interface argsType {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  retypePassword: string;
}

// Sign Up User through POST Request
export const postSignUp = async (args: argsType) => {
  try {
    const signUpUser = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      body: JSON.stringify(args),
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
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        taskName,
        description,
        deadline,
        type,
        subject,
      }),
    });

    const responseJSON = await newTask.json();

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
