import { createContext, useState } from "react";

export const TriggerContext = createContext<string>('');

export const TriggerProvider = ({ children }: any) => {
  const [active, setActive] = useState(false);

  const trigger = () => {
    setActive(!active);
  }

  const contextValue: any = {
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

