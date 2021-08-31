import 'bootstrap';
import '../src/styles/global.scss'
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path='/' exact component={Signin}/>
          <Route path='/home' component={Home}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
