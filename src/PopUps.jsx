// PopUps.jsx
import React, { useState, useEffect } from "react";
import { usePopUps } from "./PopUpsContext";
import "./styles/PopUps.css";

const PopUps = ({ maxPopups = 6 }) => {
  const { popups, triggerPopup } = usePopUps();
  const [activePopups, setActivePopups] = useState([]);

  useEffect(() => {
    // Initial pop-up
    const initialTimer = setTimeout(() => {
      triggerPopup("facebook");
    }, 2000);

    // Regular pop-up interval
    const popupInterval = setInterval(() => {
      if (activePopups.length < maxPopups) {
        const types = ["facebook", "google", "windows"];
        triggerPopup(types[Math.floor(Math.random() * types.length)]);
      }
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(popupInterval);
    };
  }, [maxPopups, activePopups.length, triggerPopup]);

  useEffect(() => {
    setActivePopups(popups);
  }, [popups]);

  const handleClose = (id) => {
    setActivePopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  return (
    <div className="popup-container">
      {activePopups.map((popup) => (
        <div
          key={popup.id}
          className="popup"
          style={{
            left: `${popup.position.x}%`,
            top: `${popup.position.y}%`,
            zIndex: 99999,
          }}
        >
          <div className="popup-header">
            <span className="popup-icon">{popup.icon}</span>
            <h3>{popup.title}</h3>
            <button
              className="close-button"
              onClick={() => handleClose(popup.id)}
            >
              ×
            </button>
          </div>
          <div className="popup-content">
            <p>{popup.message}</p>
            <button
              className="action-button"
              onClick={() => handleClose(popup.id)}
            >
              {popup.button}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopUps;
