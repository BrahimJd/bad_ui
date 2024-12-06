// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PopUpProvider } from "./PopUpsContext";
import PopUpTrigger from "./PopUpTrigger";
import Escape from "./Escape";
import LoadingPage from "./Loading Page";
import HomePage from "./boba/HomePage";

const App = () => {
  return (
    <PopUpProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/logout" element={<Escape />} />
            <Route path="*" element={<LoadingPage />} />
          </Routes>
        </div>
      </Router>
    </PopUpProvider>
  );
};

export default App;
