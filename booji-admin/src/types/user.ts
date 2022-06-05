export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
