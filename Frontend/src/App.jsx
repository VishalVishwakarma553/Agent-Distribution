import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Toaster } from 'react-hot-toast'

function App() {
  const location = useLocation()
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)
  return (
    <>
      { !isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

      </Routes>
      <Toaster position="bottom-right"
  reverseOrder={false}/>
    </>
  );
}

export default App;
