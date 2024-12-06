// PopUps.jsx
import React, { useState, useEffect } from "react";
import "./styles/PopUps.css";

const redirectPopups = [
  {
    type: "facebook",
    icon: "🔒",
    title: "Facebook Security Check",
    message:
      "Your Facebook account needs verification. Login now to prevent account suspension.",
    button: "Secure Account Now",
    url: "https://facebook.com",
  },
  {
    type: "google",
    icon: "⚠️",
    title: "Google Account Alert",
    message: "Unusual activity detected. Verify your identity now.",
    button: "Verify Account",
    url: "https://google.com",
  },
];

const overlayPopups = [
  {
    type: "warning",
    icon: "🛡️",
    title: "System Warning",
    message: "Your system performance is at risk!",
    button: "Acknowledge",
  },
  {
    type: "update",
    icon: "🔄",
    title: "Update Required",
    message: "Critical system update needed.",
    button: "Later",
  },
];

const PopUps = () => {
  const [activePopups, setActivePopups] = useState([]);

  useEffect(() => {
    const spawnPopup = () => {
      const isRedirect = Math.random() > 0.5;
      const popupList = isRedirect ? redirectPopups : overlayPopups;
      const popup = popupList[Math.floor(Math.random() * popupList.length)];

      const position = {
        x: Math.random() * 90,
        y: Math.random() * 90,
        rotation: Math.random() * 10 - 5,
        scale: Math.random() * 0.5 + 0.75,
      };

      setActivePopups((prev) => [
        ...prev,
        {
          ...popup,
          id: Date.now(),
          position,
          isRedirect,
        },
      ]);
    };

    const interval = setInterval(spawnPopup, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (popup) => {
    if (popup.isRedirect && popup.url) {
      window.location.href = popup.url;
    } else {
      handleClose(popup.id);
    }
  };

  const handleClose = (id) => {
    setActivePopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  return (
    <div className="popup-container">
      {activePopups.map((popup) => (
        <div
          key={popup.id}
          className={`popup ${popup.type} ${
            popup.isRedirect ? "redirect" : "overlay"
          }`}
          style={{
            left: `${popup.position.x}%`,
            top: `${popup.position.y}%`,
            transform: `rotate(${popup.position.rotation}deg) scale(${popup.position.scale})`,
            zIndex: popup.isRedirect ? 1001 : 1000,
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
              onClick={() => handleAction(popup)}
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
