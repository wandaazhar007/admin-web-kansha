import { createContext, useState } from "react";

export const SidebarContext = createContext<string>('');

export const SidebarProvider = ({ children }: any) => {
  const [active, setActive] = useState(false);

  const triggerSidebar = () => {
    setActive(!active);
  }

  const contextValue: any = {
    active,
    setActive,
    triggerSidebar
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

