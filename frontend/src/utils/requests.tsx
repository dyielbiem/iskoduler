// Fetch all the schedules through GET request with authentication
export const getSchedules = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/schedules", {
      method: "GET",
      credentials: "include",
    });
    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// Add New Task through POST Request
export const postTask = async (
  taskName: string,
  deadline: string,
  type: string,
  subject: string,
  description: string
) => {
  try {
    const response = await fetch("http://localhost:5000/api/schedules/tasks", {
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
}

// Update Task through PATCH Request
export const updateTask = async (taskID: string, task: taskType) => {
  try {
    const response = await fetch(
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
    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// Delete Task through DELETE Request
export const deleteTask = async (taskID: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/schedules/tasks/${taskID}`,
      {
        method: "DELETE",
        credentials: "include",
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

// Add New Post through POST Request
export const postClass = async (
  className: string,
  description: string,
  daySchedule: string,
  timeStart: string,
  timeEnd: string
) => {
  try {
    const response = await fetch(
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
}

// Update Class through PATCH Request
export const updateClass = async (classID: string, classItem: classType) => {
  try {
    const response = await fetch(
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
    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// Delete Class through DELETE Request
export const deleteClass = async (classID: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/schedules/classes/${classID}`,
      {
        method: "DELETE",
        credentials: "include",
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
