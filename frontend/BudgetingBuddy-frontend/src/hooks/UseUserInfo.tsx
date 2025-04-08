import { useContext } from "react";
import { UserInformationContext } from "../store/UserInformationStore";

const UseUserInfo = () => {
  const context = useContext(UserInformationContext);

  if (context === undefined) {
    throw new Error(
      "user info context must be used within its provider component check that your component is within it",
    );
  }

  return context;
};

export { UseUserInfo };
