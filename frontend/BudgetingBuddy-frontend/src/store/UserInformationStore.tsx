import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { ReactNode } from "react";
import { UserInfoContextType, UserInfoStateType } from "../types/UserInfoContextTypes";

interface UserInfoProviderType {
  children?: ReactNode;
}

const UserInformationContext = createContext<UserInfoContextType | undefined>(
  undefined
);

export const UserInfoContextTypeProvider: React.FC<UserInfoProviderType> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoStateType>({
    email: undefined,
    name: undefined,
    password: undefined,
  });

  const setEmail = useCallback(
    (email: string) => {
      setUserInfo((prev) => {
        return {
          ...prev,
          email: email,
        };
      });
    },
    [setUserInfo]
  );

  const setName = useCallback(
    (name: string) => {
      setUserInfo((prev) => {
        return {
          ...prev,
          name: name,
        };
      });
    },
    [setUserInfo]
  );

  const setPassword = useCallback((password: string) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        password: password,
      };
    });
  }, []);

  useEffect(() => {
    console.log(userInfo)
  },[userInfo]);

  const ctxValue = useMemo(() => {
    return {
      userInfo: userInfo,
      setEmail: setEmail,
      setName: setName,
      setPassword: setPassword,
    };
  }, [userInfo]);

  return (
    <UserInformationContext.Provider value={ctxValue}>
      {children}
    </UserInformationContext.Provider>
  );
};


export {UserInformationContext}