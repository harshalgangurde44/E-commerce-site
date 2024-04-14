import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  return (
    <UserContext.Provider value={{ products, setProducts }}>
      {children}
    </UserContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  const { products, setProducts } = context;

  return { products: products || [], setProducts };
};
