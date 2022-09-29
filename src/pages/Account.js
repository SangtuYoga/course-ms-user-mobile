import React from 'react';
import usericon from '../assets/user-icon.png'
import { useHistory, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import  { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

const Account = (props) => {
  const history = useHistory();
  const email = localStorage.getItem('email');
  
  const logOut = async () => {
    axios.delete("http://localhost:3000/logout", { withCredentials: 'true' })
        .then((response) => {
            console.log(response)
            history.push("/");
        })
  }; 
  useEffect(() => {
    getNama();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [coba, setCoba] = useState([]);
  const getNama = async () => {
    axios.get("http://localhost:3000/usersstudent", {withCredentials : "true"})
      .then((response) => {
        setCoba(response.data);
      })
      .catch(error => {
        console.log(error.response);
    });
  };
  const filtt = coba.filter(
    item => item.email === email
  );  


  return (
    <div className="container">
      <div className="justify-content-center mt-5">
      <img
              alt=""
              src={usericon}
              width="150"
              height="150"
              className="rounded-circle mx-auto d-block"
            />{''}

        {filtt.map((i)=><>
          <p className="text-center h5 pt-3">{i.full_name}</p>
          <p className="text-center h6 text-muted">{i.email}</p>
          </>
        )}
      </div>
      <div className="justify-content-start mt-5 w-100">
        <p className="text-muted h6 mb-0">Account Setting</p>
        <ul className="list-group">
          <li className="list-group-item list-account">
          <Link to="/account_security" className="d-flex justify-content-between account-menu">
            <span>Account Security</span>
            <FontAwesomeIcon size="lg" icon={faArrowRight}/>
          </Link>
          </li>
          <li className="list-group-item list-account" >
          <Link to="/email_notification" className="d-flex justify-content-between account-menu">
            <span>Email Notification prefences</span>
            <FontAwesomeIcon size="lg" icon={faArrowRight}/>
          </Link>
          </li>
          <li className="list-group-item list-account">
          <Link onClick={logOut} className="d-flex justify-content-between account-menu-red">
            <span>Logout</span>
            <FontAwesomeIcon size="lg" icon={faArrowRight}/>
          </Link>
          </li>
        </ul>
      </div>
      <div className="justify-content-start mt-3 w-100">
        <p className="text-muted h6 mb-0">Support</p>
        <ul className="list-group">
          <li className="list-group-item list-account">
          <Link to="/absent" className="d-flex justify-content-between account-menu">
            <span>Koding Akademi Absent</span>
            <FontAwesomeIcon size="lg" icon={faArrowRight}/>
          </Link>
          </li>
          <li className="list-group-item list-account">
          <Link to="/actvity" className="d-flex justify-content-between account-menu">
            <span>Koding Akademi Activity</span>
            <FontAwesomeIcon size="lg" icon={faArrowRight}/>
          </Link>
          </li>
        </ul>
      </div>
      <div style={{ paddingBottom: '90px' }}>
      </div>
      <Navigation/>
    </div>
  )
};

export default Account;
