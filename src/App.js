import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import theme from "./themes/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import Header from "./Pages/Header";
import Todo from "./Pages/Todo";
import Forgetpassword from "./Pages/forgetpassword";
import ResetCode from "./Pages/ResetCode";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // const isLoggedIn = false;
  console.log("isLoggedIn", isLoggedIn);

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/signin" />;
  };

  const LoginRoute = ({ element }) => {
    return isLoggedIn ? <Navigate to="/" /> : element;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isLoggedIn && <Header />}

        <Routes>
          {/* Define your routes */}

          {/* Login route */}
          <Route path="/signin" element={<LoginRoute element={<SignIn />} />} />
          {/* signup route */}
          <Route path="/signup" element={<LoginRoute element={<SignUp />} />} />
          {/* forgetpassword route */}
          <Route
            path="/forgetpassword"
            element={<LoginRoute element={<Forgetpassword />} />}
          />
          {/* forgetpassword route */}
          <Route
            path="/resetcode"
            element={<LoginRoute element={<ResetCode />} />}
          />
          {/* resetpassword route */}
          <Route
            path="/resetpassword"
            element={<LoginRoute element={<ResetPassword />} />}
          />

          {/* other pages route */}
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/todo" element={<ProtectedRoute element={<Todo />} />} />

          {/* If any undeclared routes then , if logged in navigate to home else to signin page **************** */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/signin"} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
