import { createContext, useState } from "react";
import { TriggerContextType } from "../types/types";

export const TriggerContext: any = createContext('');

export const TriggerProvider = ({ children }: any) => {
  const [active, setActive] = useState<boolean>(false);

  const trigger = () => {
    setActive(!active);
  }

  const contextValue: TriggerContextType = {
    active,
    setActive,
    trigger
  }

  return (
    <TriggerContext.Provider value={contextValue}>
      {children}
    </TriggerContext.Provider>
  )
}

