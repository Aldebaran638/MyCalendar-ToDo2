import { createContext, Dispatch, SetStateAction } from "react";

interface SharedStateContextType {
  controllerStartTime: string;
  setControllerStartTime: Dispatch<SetStateAction<string>>;
  controllerEndTime: string;
  setcontrollerEndTime: Dispatch<SetStateAction<string>>;
  controllerError: string;
  setControllerError: Dispatch<SetStateAction<string>>;
}
export const SharedStateContext = createContext<SharedStateContextType | null>(
  null
);
