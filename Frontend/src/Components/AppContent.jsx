import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import AddAgent from "./AddAgent";
import AssignedList from "./AssignedList";
import { useContext } from "react";
import { AppStore } from "../Store/AppStore";

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  const {setUser} = useContext(AppStore)
  const user = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    setUser(user)
  }, [])

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className={isAuthPage ? "" : "pt-16"}>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login"></Navigate>}
          />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/addAgent"
            element={user ? <AddAgent /> : <Navigate to="/login"></Navigate>}
          ></Route>
          <Route
            path="/assign/:agentId"
            element={
              user ? <AssignedList /> : <Navigate to="/login"></Navigate>
            }
          ></Route>
        </Routes>
      </main>
    </>
  );
};

export default AppContent;
