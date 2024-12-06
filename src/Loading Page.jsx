// LoadingPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoadingPage.css";

const LoadingPage = () => {
  const [circleProgress, setCircleProgress] = useState(0);
  const [barProgress, setBarProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ShowMockMessage, setShowMockMessage] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const navigate = useNavigate();

  const handleGiveUp = () => {
    setShowMockMessage(true);
    setTimeout(() => {
      setShowMockMessage(false);
      setCircleProgress(0);
      setBarProgress(0);
      setDisplayProgress(0);
      setShowConfirm(false);
    }, 3000);
  };

  useEffect(() => {
    // Show confirmation after 15 seconds
    const confirmTimer = setTimeout(() => {
      setShowConfirm(true);
    }, 15000);

    const circleTimer = setInterval(() => {
      setCircleProgress((prev) => {
        const jump = Math.random() * 5;
        return Math.min(prev + jump, 100);
      });
    }, 290);
    const barTimer = setInterval(() => {
      setBarProgress((prev) => {
        const jump = prev < 60 ? Math.random() * 30 : -Math.random() * 20;
        return prev < 60 ? Math.min(prev + jump, 60) : Math.max(prev + jump, 0);
      });
    }, 960);

    const displayTimer = setInterval(() => {
      setDisplayProgress((prev) => {
        const jump = prev < 70 ? Math.random() * 20 : Math.random() * 1;
        return Math.min(prev + jump, 100);
      });
    }, 400);

    return () => {
      clearTimeout(confirmTimer);
      clearInterval(circleTimer);
      clearInterval(barTimer);
      clearInterval(displayTimer);
    };
  }, []);

  const handleButtonClick = () => {
    if (attempt === 0) {
      setAttempt(1);
      setCircleProgress(0);
      setBarProgress(0);
      setDisplayProgress(0);
      setShowConfirm(false);
    } else {
      navigate("/main");
    }
  };

  return (
    <div className="loading-container">
      <div className="loading-wrapper">
        <div
          className="circle-loader"
          style={{
            background: `conic-gradient(white ${
              circleProgress * 3.6
            }deg, transparent 0deg)`,
          }}
        />
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${barProgress}%` }} />
        </div>
        <div className="percentage-text">{Math.floor(displayProgress)}%</div>

        {showConfirm && (
          <div className="confirm-overlay">
            <div className="confirm-box">
              <h2 className="glitch-text">Loading is taking forever...</h2>
              <p className="wobble-text">Do you want to:</p>
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
                <button className="move-random" onClick={handleGiveUp}>
                  Or just give up?
                </button>
              </div>
            </div>
          </div>
        )}

        {ShowMockMessage && (
          <div className="mock-message-overlay">
            <div className="mock-message-box">
              <h2 className="glitch-text">Waiting is your only option :)</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
