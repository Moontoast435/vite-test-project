export type Todo = {
  id: number;
  description: string;
  complete: boolean;
  userId: string;
};

export type Account = {
  userId: string;
  userName: string;
  password: string;
};

export type ErrorSignUp = {
  usernameError: string | null;
  passwordError: string | null;
  passwordMatchError: string | null;
};
