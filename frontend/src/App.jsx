import Navbar from "./components/navbar";
import HomePage from "./components/Home";
import SignUpPage from "./components/Signup";
import LoginPage from "./components/Login";
import SettingsPage from "./components/Settings";
import ProfilePage from "./components/Profile";
import { useAuth } from "./ex/useAuth";
import { useTheme } from "./ex/useTheme";

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const app = () => {

  const { authUser, checkAuth  , onlineUsers} = useAuth(); //destructuring
  const {theme} = useTheme(); 

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //console.log({ authUser });

  return (
  
    <div data-theme={theme}>

      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    
    </div>
  );
};

export default app;
