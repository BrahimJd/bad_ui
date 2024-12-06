// HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RealPointer from "../RealPointer";
import PopUps from "../PopUps";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isInverted, setIsInverted] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(true);
  const [randomImageSrc] = useState(
    "https://www.shutterstock.com/shutterstock/photos/43642528/display_1500/stock-photo-young-man-swimming-in-oceans-water-43642528.jpg"
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowLoginMessage(false), 3000);

    const reloadTimer = setInterval(() => {
      if (Math.random() > 0.9) window.location.reload();
    }, 10000);

    const flipTimer = setInterval(() => {
      setIsInverted((prev) => !prev);
    }, 5000);

    const loadingTimer = setInterval(() => {
      if (Math.random() > 0.8) navigate("/");
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(reloadTimer);
      clearInterval(flipTimer);
      clearInterval(loadingTimer);
    };
  }, [navigate]);

  const handleMouseMove = (e) => {
    setCursorPosition({
      x: window.innerWidth - e.clientX,
      y: window.innerHeight - e.clientY,
    });
  };

  const handleButtonClick = (message) => {
    alert(message);
    if (Math.random() > 0.5) {
      navigate("/");
    }
  };

  const handleTextHover = () => {
    document.body.style.overflow = "hidden";
    setTimeout(() => (document.body.style.overflow = "auto"), 2000);
  };

  return (
    <div
      className="outer-wrapper"
      onMouseMove={handleMouseMove}
      style={{
        filter: isInverted ? "invert(1) hue-rotate(180deg)" : "none",
      }}
    >
      <RealPointer />
      <PopUps maxPopups={6} />

      <button className="exit-button" onClick={() => navigate("/logout")}>
        Exit
      </button>

      <div className="header">
        <h1 className="blinking-text">🤮 ✨ Welcome to Torture! ✨ 🤢</h1>
      </div>

      <div className="marquee-container">
        <marquee behavior="alternate" scrollamount="30" className="marquee">
          CLICK ANYTHING IF YOU DARE!
        </marquee>
      </div>

      <div className="content">
        <p className="random-text" onMouseEnter={handleTextHover}>
          This website is an endless loop of misery. Enjoy navigating through
          random links that don't work!
        </p>

        <a href="#" className="fake-link" onClick={(e) => e.preventDefault()}>
          Click me for a surprise!
        </a>

        <div className="button-grid">
          <button onClick={() => handleButtonClick("Wrong button!")}>
            Do Not Click
          </button>
          <button onClick={() => handleButtonClick("Try again!")}>Nope</button>
          <button onClick={() => handleButtonClick("Still wrong!")}>
            Guess Again
          </button>
          <button onClick={() => handleButtonClick("Nothing happens.")}>
            Haha!
          </button>
        </div>

        <img className="random-image" src={randomImageSrc} alt="Confusion" />

        <div
          className="cursor-trail"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
          }}
        />
      </div>

      {showLoginMessage && (
        <div className="login-message-overlay">
          <div className="login-message-box">
            <h2>Dude, did you even login?</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
