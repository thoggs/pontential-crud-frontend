import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/styles/global.scss'
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import { Dashboard } from "./components/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path='/' exact component={Signin}/>
            <Dashboard>
              <Route path='/home' component={Home}/>
            </Dashboard>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
