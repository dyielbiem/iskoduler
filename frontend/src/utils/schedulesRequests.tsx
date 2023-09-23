// Fetch all the schedules through GET request with authentication
export const postSchedules = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/schedules/`,
      {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

interface taskType {
  taskName: string;
  deadline: string;
  type: string;
  subject: string;
  description?: string;
  token: string;
}

// Add New Task through POST Request
export const postTask = async (task: taskType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/schedules/tasks/`,
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// Update Task through PATCH Request
export const updateTask = async (taskID: string, task: taskType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/schedules/tasks/${taskID}/`,
      {
        method: "PATCH",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// Delete Task through DELETE Request
export const patchDeleteTask = async (taskID: string, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/schedules/tasks/delete/${taskID}/`,
      {
        method: "PATCH",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

interface classType {
  className: string;
  description: string;
  daySchedule: string;
  timeStart: string;
  timeEnd: string;
  token: string;
}

// Add New Post through POST Request
export const postClass = async (classItem: classType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/schedules/classes/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(classItem),
      }
    );

    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// Update Class through PATCH Request
export const updateClass = async (classID: string, classItem: classType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/schedules/classes/${classID}/`,
      {
        method: "PATCH",
        body: JSON.stringify(classItem),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// Delete Class through DELETE Request
export const patchDeleteClass = async (classID: string, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/schedules/classes/delete/${classID}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );
    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};
