export type Todo = {
  id: number;
  description: string;
  complete: boolean;
  userId: string;
};


export type ErrorSignUp = {
  usernameError: string | null;
  passwordError: string | null;
  passwordMatchError: string | null;
};
