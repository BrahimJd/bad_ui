import React, { useState, useEffect } from "react";

const CursorSVG = () => (
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
);

const RealPointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      className="real-cursor"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-5px, -3px)",
      }}
    >
      <CursorSVG />
    </div>
  );
};

export default RealPointer;
