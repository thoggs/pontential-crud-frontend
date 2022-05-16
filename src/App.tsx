import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/styles/global.scss'
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthContextProvider} from "./contexts/authContext";
import {Signin} from "./pages/Signin";
import {Home} from "./pages/Home";
import {Dashboard} from "./components/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Signin/>}/>
          <Route path='/home' element={
            <Dashboard>
              <Home/>
            </Dashboard>
          }/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
