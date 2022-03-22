import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Dashboard from "./components/dashboard";
import Login from "./components/Login/login";
import { Route , Routes} from 'react-router-dom';
import { auth } from "./firebase";
import Header from "./components/Header";
import Home from "./components/home";

function App() {
  const [user] = useAuthState(auth);
  
  return (<>
  
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signIn" element={<Login/>} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </>
  );
}

export default App;
