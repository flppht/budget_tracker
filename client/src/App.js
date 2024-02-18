import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import CreateOutcome from "./components/CreateOutcome";
import OutcomePage from "./components/OutcomePage";
import Outcomes from "./components/Outcomes";
import Incomes from "./components/Incomes";
import CreateIncome from "./components/CreateIncome";
import IncomePage from "./components/IncomePage";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import { AuthContext } from "./utility/AuthContext";
import axios from "axios";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/auth`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Router>
          <div className="navbar">
            {loggedIn && (
              <>
                <Link to="/">Wallet</Link>
                <Link to="/outcomes">Outcomes</Link>
                <Link to="/incomes">Incomes</Link>
              </>
            )}
            {!loggedIn && <Link to="/auth">Sign in</Link>}
          </div>
          <Routes>
            {!loggedIn && <Route path="/auth" element={<Auth />} />}
            {loggedIn && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/outcomes" element={<Outcomes />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/createoutcome" element={<CreateOutcome />} />
                <Route path="/createincome" element={<CreateIncome />} />
                <Route path="/outcomes/:id" element={<OutcomePage />} />
                <Route path="/incomes/:id" element={<IncomePage />} />{" "}
              </>
            )}
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
