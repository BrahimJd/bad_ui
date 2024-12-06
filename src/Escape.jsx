// Escape.jsx
import React, { useState, useCallback } from "react";
import "./styles/MousePointer.css";
import RealPointer from "./RealPointer";

const NUM_POINTERS = 4000;

const Escape = () => {
  const [pointers] = useState(Array(NUM_POINTERS).fill(0));
  const [buttonPosition, setButtonPosition] = useState({
    left: Math.random() * 80 + 10,
    top: Math.random() * 80 + 10,
  });

  const handleExit = useCallback(() => {
    setButtonPosition({
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
    });
  }, []);

  return (
    <div className="game-container">
      <RealPointer />
      <button
        className="exit-button"
        onClick={handleExit}
        style={{
          left: `${buttonPosition.left}%`,
          top: `${buttonPosition.top}%`,
        }}
      >
        Exit
      </button>
      {pointers.map((_, index) => (
        <div
          key={index}
          className="pointer"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDelay: `${Math.random() * -4}s`,
            "--rand-x1": `${Math.random() * 200 - 100}px`,
            "--rand-y1": `${Math.random() * 200 - 100}px`,
            "--rand-x2": `${Math.random() * 200 - 100}px`,
            "--rand-y2": `${Math.random() * 200 - 100}px`,
            "--rand-x3": `${Math.random() * 200 - 100}px`,
            "--rand-y3": `${Math.random() * 200 - 100}px`,
          }}
        >
          <div className="pointer-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3L19 17L12 17L8 21L5 3Z"
                fill="white"
                stroke="black"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Escape;
