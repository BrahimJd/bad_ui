// PopUpContext.jsx
import React, { createContext, useContext, useState } from "react";

const PopUpContext = createContext();

export const PopUpProvider = ({ children }) => {
  const [popups, setPopups] = useState([]);

  const triggerPopup = (type) => {
    if (popups.length >= 6) return; // Don't add if at limit

    const newPopup = {
      id: Date.now(),
      position: {
        x: Math.random() * 70,
        y: Math.random() * 70,
      },
      type,
      title: `${type} Popup`,
      message: `This is a ${type} popup message.`,
      button: "Close",
      icon: "🔔",
      isRedirect: Math.random() > 0.5,
      url: type === "facebook" ? "https://facebook.com" : null,
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
