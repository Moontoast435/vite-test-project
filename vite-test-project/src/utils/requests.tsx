import { Account } from "../features/SignUp/types/accountTypes";

type AccountCreatedResponse = {
  StatusCode: string;
  Message: string;
  Account: Account;
}

export const sendCreateAccount = async (
  username: string,
  password: string
): Promise<{
  success: boolean;
  data?: AccountCreatedResponse | null;
  error?: string;
}> => {
  try {
    const params = new URLSearchParams({
      userName: username,
      password: password,
    }).toString();

    const url = `https://localhost:44343/api/Account/CreateAccount?${params}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data : AccountCreatedResponse =  await response.json();
    return {
      success: true,
      data: data, // Include the API response data
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};
