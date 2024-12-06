// PopUpTrigger.jsx
import React, { useEffect } from "react";
import { usePopUps } from "./PopUpsContext";

const PopUpTrigger = ({ autoStart = true, interval = 3000 }) => {
  const { triggerPopup } = usePopUps();

  useEffect(() => {
    if (autoStart) {
      const types = ["facebook", "google", "windows"];
      const timer = setInterval(() => {
        const randomType = types[Math.floor(Math.random() * types.length)];
        triggerPopup(randomType);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [autoStart, interval]);

  const handleManualTrigger = (type) => {
    triggerPopup(type);
  };
};

export default PopUpTrigger;
