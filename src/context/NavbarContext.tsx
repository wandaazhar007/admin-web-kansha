import { createContext, useState } from "react";
// import { act } from "react-dom/test-utils";

export const NavbarContext = createContext<string>('');

export const NavbarProvider = ({ children }: any) => {
  const [active, setActive] = useState(false);

  const triggerNavbar = () => {
    setActive(!active);
    console.log('navbar', active)
  }

  const contextValue: any = {
    active,
    setActive,
    triggerNavbar
  }

  return (
    <NavbarContext.Provider value={contextValue}>
      {children}
    </NavbarContext.Provider>
  )
}

