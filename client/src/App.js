import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import CreateExpense from "./components/CreateExpense";
import ExpensePage from "./components/ExpensePage";
import TotalAmount from "./components/TotalAmout";
import Expenses from "./components/Expenses";
import Income from "./components/Income";
import CreateIncome from "./components/CreateIncome";
import IncomePage from "./components/IncomePage";
import { useEffect, useState } from "react";
import { AuthContext } from "./utility/AuthContext";
import axios from "axios";
import NavBar from "./components/NavBar";

const App = () => {
  const [loggedIn, setLoggedIn] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/auth`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setLoggedIn({ ...loggedIn, status: false });
        } else {
          setLoggedIn({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Router>
          <div className="navbar">
            {loggedIn.status && <NavBar username={loggedIn.username} />}
          </div>
          <Routes>
            {!loggedIn.status && <Route path="/" element={<Home />} />}
            {loggedIn.status && (
              <>
                <Route path="/total" element={<TotalAmount />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/income" element={<Income />} />
                <Route path="/createexpense" element={<CreateExpense />} />
                <Route path="/createincome" element={<CreateIncome />} />
                <Route path="/expenses/:id" element={<ExpensePage />} />
                <Route path="/income/:id" element={<IncomePage />} />
              </>
            )}
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
