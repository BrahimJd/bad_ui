// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PopUpProvider } from "./PopUpsContext";
import PopUps from "./PopUps";
import PopUpTrigger from "./PopUpTrigger";
import Escape from "./Escape";
import LoadingPage from "./Loading Page";

const App = () => {
  return (
    <PopUpProvider>
      <Router>
        <div>
          {/* PopUps will show across all routes */}
          <PopUps />
          <PopUpTrigger autoStart={true} interval={2000} />

          <Routes>
            <Route path="/" element={<Escape />} />
            <Route path="/loading" element={<LoadingPage />} />
          </Routes>
        </div>
      </Router>
    </PopUpProvider>
  );
};

export default App;
