import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import TotalAmount from "./components/TotalAmout";
import Expenses from "./components/Expenses";
import Income from "./components/Income";
import { useEffect, useState } from "react";
import { AuthContext } from "./utility/AuthContext";
import axios from "axios";
import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";
import ItemPage from "./components/ItemPage";
import CreateItem from "./components/CreateItem";
import Settings from "./components/Settings";

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
                <Route
                  path="/createexpense"
                  element={<CreateItem endpoint="expenses" />}
                />
                <Route
                  path="/createincome"
                  element={<CreateItem endpoint="income" />}
                />
                <Route
                  path="/expenses/:id"
                  element={<ItemPage endpoint="expenses" />}
                />
                <Route
                  path="/income/:id"
                  element={<ItemPage endpoint="income" />}
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/pagenotfound" element={<PageNotFound />} />
                <Route
                  path="*"
                  element={<Navigate to="/pagenotfound" replace={true} />}
                />
                <Route
                  path="/"
                  element={<Navigate to="/total" replace={true} />}
                />
              </>
            )}
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
