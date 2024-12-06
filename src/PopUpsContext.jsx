// PopUpContext.jsx
import React, { createContext, useContext, useState } from "react";

const PopUpContext = createContext();

export const PopUpProvider = ({ children }) => {
  const [popups, setPopups] = useState([]);

  const triggerPopup = (type) => {
    const newPopup = {
      id: Date.now(),
      position: {
        x: Math.random() * 70,
        y: Math.random() * 70,
      },
      type,
    };
    setPopups((prev) => [...prev, newPopup]);
  };

  const clearPopups = () => setPopups([]);

  return (
    <PopUpContext.Provider value={{ popups, triggerPopup, clearPopups }}>
      {children}
    </PopUpContext.Provider>
  );
};

export const usePopUps = () => useContext(PopUpContext);
