import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { ReactNode } from "react";
import { UserInfoContextType, UserInfoStateType } from "../types/UserInfoContextTypes";
import { loadFromSessionStorage, saveToSessionStorage } from "../utils/sessionStorage";

interface UserInfoProviderType {
  children?: ReactNode;
}

const UserInformationContext = createContext<UserInfoContextType | undefined>(
  undefined
);

const KEY = 'UserInfo'

const initialState = {
  email: undefined,
  name: undefined,
  userName: undefined,
  password: undefined,
}


export const UserInfoContextTypeProvider: React.FC<UserInfoProviderType> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoStateType>(loadFromSessionStorage(KEY, initialState));

  useEffect(() => {
    saveToSessionStorage(KEY, userInfo)
  }, [userInfo])

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
  }, [setUserInfo]);

  const setUserName = useCallback((userName: string) => {
    setUserInfo((prev) => {
        return {
            ...prev, 
            userName: userName
        }
    })
  }, [setUserInfo])

  useEffect(() => {
    console.log(userInfo)
  },[userInfo]);

  const ctxValue = useMemo(() => {
    return {
      userInfo: userInfo,
      setEmail: setEmail,
      setName: setName,
      setPassword: setPassword,
      setUserName: setUserName,
    };
  }, [userInfo]);

  return (
    <UserInformationContext.Provider value={ctxValue}>
      {children}
    </UserInformationContext.Provider>
  );
};


export {UserInformationContext}