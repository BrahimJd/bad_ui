// LoadingPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoadingPage.css";

const LoadingPage = () => {
  const navigate = useNavigate();
  const [circleProgress, setCircleProgress] = useState(0);
  const [barProgress, setBarProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMockMessage, setShowMockMessage] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [isReversing, setIsReversing] = useState(false);
  const [isPacman, setIsPacman] = useState(false);

  useEffect(() => {
    const transformTimer = setTimeout(() => {
      setIsPacman(true);
    }, 5000);

    // Show confirmation after 15 seconds
    const confirmTimer = setTimeout(() => {
      setShowConfirm(true);
    }, 15000);

    // Circle/Pacman progress
    const circleTimer = setInterval(() => {
      setCircleProgress((prev) => {
        const jump = Math.random() * 5;
        return isReversing
          ? Math.max(prev - jump, -50)
          : Math.min(prev + jump, 150);
      });
    }, 290);

    // Bar progress
    const barTimer = setInterval(() => {
      setBarProgress((prev) => {
        const jump = Math.random() * 30;
        return isReversing
          ? Math.max(prev - jump, -100)
          : Math.min(prev + jump, 100);
      });
    }, 960);

    // Display percentage with negatives
    const displayTimer = setInterval(() => {
      setDisplayProgress((prev) => {
        const jump = isReversing ? -Math.random() * 20 : Math.random() * 20;
        return Math.min(Math.max(prev + jump, -100), 100);
      });
    }, 400);

    // Random progress reversal
    const reverseTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsReversing((prev) => !prev);
      }
    }, 5000);

    return () => {
      clearTimeout(transformTimer);
      clearTimeout(confirmTimer);
      clearInterval(circleTimer);
      clearInterval(barTimer);
      clearInterval(displayTimer);
      clearInterval(reverseTimer);
    };
  }, [isReversing]);

  const getLoaderGradient = () => {
    if (!isPacman) {
      return `conic-gradient(
      from 0deg,
      white ${circleProgress * 3.6}deg,
      transparent ${circleProgress * 3.6}deg
    )`;
    }
    return null;
  };
  // LoadingPage.jsx - Update handleButtonClick and mock message
  const handleButtonClick = () => {
    if (attempt === 0) {
      // First attempt - restart loading
      setAttempt(1);
      setCircleProgress(0);
      setBarProgress(0);
      setDisplayProgress(0);
      setShowConfirm(false);
      setIsPacman(false);
    } else {
      // Second attempt - go to homepage
      navigate("/home");
    }
  };

  const handleGiveUp = () => {
    setShowMockMessage(true);
    setTimeout(() => {
      setShowMockMessage(false);
      setAttempt(0); // Reset attempt count
      setCircleProgress(0);
      setBarProgress(0);
      setDisplayProgress(0);
      setShowConfirm(false);
      setIsPacman(false); // Reset Pacman state
    }, 3000);
  };
  return (
    <div className="loading-container">
      <div className="loading-wrapper">
        <div
          className={`circle-loader ${isPacman ? "pacman" : ""}`}
          style={{
            background: getLoaderGradient(),
            transform: `rotate(${isPacman ? circleProgress * 3.6 : 0}deg)`,
          }}
        />
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${Math.abs(barProgress)}%`,
              background: barProgress < 0 ? "red" : "white",
            }}
          />
        </div>
        <div
          className={`percentage-text ${isReversing ? "reversing" : ""}`}
          style={{ color: displayProgress < 0 ? "#ff4444" : "#fff" }}
        >
          {displayProgress < 0 ? "−" : ""}
          {Math.abs(Math.floor(displayProgress))}%
        </div>

        {showMockMessage && (
          <div className="mock-message-overlay">
            <div className="mock-message-box">
              <h2>Waiting is your only option :) </h2>
            </div>
          </div>
        )}

        {showConfirm && (
          <div className="confirm-overlay">
            <div className="confirm-box">
              <h2>Loading is taking forever...</h2>
              <p>Do you want to:</p>
              <div className="button-chaos">
                <button className="move-random" onClick={handleButtonClick}>
                  Continue waiting?
                </button>
                <button className="move-random" onClick={handleButtonClick}>
                  Keep waiting??
                </button>
                <button className="move-random" onClick={handleButtonClick}>
                  Wait more???
                </button>
                <button className="move-random" onClick={() => handleGiveUp()}>
                  Give up?
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
