import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/transfer"} element={<Transaction />} />
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/*"} element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
