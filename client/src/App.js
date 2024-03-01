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
import { useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";
import ItemPage from "./components/ItemPage";
import CreateItem from "./components/CreateItem";
import Settings from "./components/Settings";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const accessToken = useSelector((state) => state.accessToken);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/auth`, {
        headers: { accessToken: accessToken?.token },
      })
      .then((response) => {
        if (response.data.error) {
          dispatch(logout());
        } else {
          dispatch(
            login({ username: response.data.username, id: response.data.id })
          );
        }
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="navbar">{auth.status && <NavBar />}</div>
        <Routes>
          {!auth.status && <Route path="/" element={<Home />} />}
          {auth.status && (
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
    </div>
  );
};

export default App;
