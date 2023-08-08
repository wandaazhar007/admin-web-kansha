import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext<string>('');

export const MenuProvider = ({ children }: any) => {
  const [addMenu, setAddMenu] = useState(false);

  const trigger = () => {
    setAddMenu(!addMenu);
  }

  const contextValue: any = {
    addMenu,
    setAddMenu,
    trigger
  }

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  )
}

