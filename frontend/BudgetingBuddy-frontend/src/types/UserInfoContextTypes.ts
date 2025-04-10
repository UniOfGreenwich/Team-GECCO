interface UserInfoContextType {
  userInfo: UserInfoStateType;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  setUserName: (userName: string) => void;
}

interface UserInfoStateType {
  email: string | undefined;
  name: string | undefined;
  userName: string | undefined;
  password: string | undefined;
}

export type { UserInfoContextType, UserInfoStateType };
