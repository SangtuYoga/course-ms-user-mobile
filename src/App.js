import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from './pages/Home';
import Search from './pages/Search';
import Account from './pages/Account';
import Appointment from './pages/Appointment';
import Note from './pages/note';
import Login from './pages/Login';
import Product from './pages/product';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/product/:id" component={Product} />
          <Layout>
          <Route exact path="/home" component={Home} />
          <Route exact path="/explore" component={Search} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/appointment" component={Appointment} />
          <Route exact path="/note" component={Note}/>
          </Layout>
          
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
