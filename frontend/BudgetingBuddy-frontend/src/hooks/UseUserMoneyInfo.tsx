import { useContext } from "react";
import { UserMoneyInfoContext } from "../store/UserMoneyInfoStore";
import { UserMoneyInfoContextType } from "../types/UserMoneyInfoContextTypes";

// use this to get access to all the information functions and stuff inside of the UserMoneyInfoStore
export const UseUserMoneyInfo = (): UserMoneyInfoContextType => {
  const context = useContext(UserMoneyInfoContext);

  if (context === undefined) {
    throw new Error(
      "useUserMoneyInfo must be used in a UserMoneyInfoProvider check in the app.tsx file to make sure your component is wrapped in it",
    );
  }

  return context;
};
