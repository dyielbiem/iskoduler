interface nameType {
  firstname: string;
  lastname: string;
  token: string;
}

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/signup/`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJSON: any = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// Sign In User through POST Request
export const postSignIn = async (username: string, password: string) => {
  try {
    const signInUser = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/signin/`,
      {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response: any = await signInUser.json();

    if (!signInUser.ok) throw Error(response.Error);

    return response;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// PATCH request to update the user's name
export const patchUserName = async (name: nameType) => {
  try {
    const respond = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/information/name/`,
      {
        method: "PATCH",
        body: JSON.stringify(name),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const respondJSON = respond.json();
    return respondJSON;
  } catch (error: any) {
    return error;
  }
};

interface passwordType {
  currentPassword: string;
  newPassword: string;
  token: string;
}

export const patchUserPassword = async (password: passwordType) => {
  try {
    const newPassword = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/information/password/`,
      {
        method: "PATCH",
        body: JSON.stringify(password),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const respondJSON = newPassword.json();
    return respondJSON;
  } catch (error: any) {
    return error;
  }
};

// Authenticate user through GET request
export const postAuthenticate = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/authenticate/`,
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

export const postUserInformation = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/information/`,
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

// Log Out User through GET Request
export const postLogout = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/logout/`,
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

// Upload user's display image through PATCH request
export const patchUserImage = async (formData: FormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/information/image/`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    const responseJSON = await response.json();
    if (!response.ok) throw Error(responseJSON.Error);

    return responseJSON;
  } catch (error: any) {
    return { Error: error.message };
  }
};

// Delete user's display image through DELETE request
export const deleteUserImage = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/information/image/delete/`,
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
