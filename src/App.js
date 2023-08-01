import React, { useContext, useEffect } from "react";
import "./App.css";
import Signup from "./Pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import View from "./Pages/ViewPost";
import { AuthContext } from "./Store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from "./Pages/Create";
import Post from "./Store/PostContext";
import Home from "./Pages/Home";

function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  });
  return (
    <div>
      <Post>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
