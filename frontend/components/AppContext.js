import React, { useState } from "react";

const AppContext = React.createContext({
  isAuthenticated: true,
  cart: {
    items: [],
    total: 0
  },
  addItem: () => {},
  removeItem: () => {},
  user: false,
  setUser: () => {}
});

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [user, setUser] = useState(false);

  const addItem = (item) => {
    // Add logic to add item to cart
    // Update the cart state
  };

  const removeItem = (item) => {
    // Add logic to remove item from cart
    // Update the cart state
  };

  const updateUser = (userData) => {
    // Add logic to update user information
    // Update the user state
  };

  const appContextValue = {
    isAuthenticated,
    cart,
    addItem,
    removeItem,
    user,
    setUser: updateUser
  };

  return (
    <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
