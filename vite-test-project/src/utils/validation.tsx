export const validateUsername = (username: string): string | null => {
  const usernamePattern = /^[a-zA-Z0-9]{0,20}$/;

  if (!usernamePattern.test(username)) {
    return "Please use only alphanumeric characters, and a length up to 20 characters.";
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!passwordPattern.test(password)) {
    return "Password must contain 1 uppercase letter, 1 number and be at least 8 characters long.";
  }

  return null;
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): string | null => {
  if (confirmPassword != "") {
    const doPWordsMatch = password === confirmPassword;

    if (!doPWordsMatch) {
      return "Please make sure your password and confirmation password match.";
    }
  }

  return null;
};
