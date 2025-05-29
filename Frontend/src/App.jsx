import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Toaster } from 'react-hot-toast'
import AppStoreWrapper from "./Store/AppStore";
import AddAgent from "./Components/AddAgent";

function App() {
  const location = useLocation()
  const isAuthPage = ['/Login', '/signup'].includes(location.pathname)
  return (
    <AppStoreWrapper>
      { !isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<Login />}></Route> 
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/addAgent" element={<AddAgent />}></Route>
      </Routes>
      <Toaster position="bottom-right"
  reverseOrder={false}/>
    </AppStoreWrapper>
  );
}

export default App;
