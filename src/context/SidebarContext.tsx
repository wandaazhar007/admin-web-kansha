import { createContext, useState } from "react";
import { SidebarContextType } from "../types/types";

export const SidebarContext: any = createContext('');

export const SidebarProvider = ({ children }: any) => {
  const [active, setActive] = useState(false);

  const triggerSidebar = () => {
    setActive(!active);
    // console.log('clicked')
  }

  const contextValue: SidebarContextType = {
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

