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
import Register from './pages/Register';
import NotFound from './pages/404';
import Course from './pages/course-detail';
import AppointmentDetail from './pages/appointment-detail';
import Report from './pages/report';
import Absent from './pages/absent';
import Scan from './pages/scan-barcode';
import SendScan from './pages/kirim-absent';
import Forget from './pages/forget';
import Verification from './pages/verification';
import ChangePassword from './pages/change-password';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/forget" component={Forget}/>
          <Route exact path="/verification-code" component={Verification}/>
          <Route exact path="/change-password" component={ChangePassword}/>
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/course-detail/:id" component={Course} />
          <Route exact path="/appointment-detail" component={AppointmentDetail}/>
          <Route exact path="/absent" component={Absent}/>
          <Route exact path="/scan-barcode" component={Scan}/>
          <Route exact path="/send-scan" component={SendScan}/>
          <Route exact path="/home" component={() => <Home autorized={true}/>} />
          <Route exact path="/explore" component={Search} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/appointment" component={Appointment} />
          <Route exact path="/note" component={() => <Note authorized={true}/>}/>
          <Route exact path="/report" component={Report} />
          <Route exact path="*" component={NotFound}/>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
