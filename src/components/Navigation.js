/*eslint-disable eqeqeq*/
import React, {useEffect, useState} from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const tabs = [{
  route: "/home",
  icon: faHome,
  label: "Home"
},{
  route: "/explore",
  icon: faSearch,
  label: "Explore"
},{
  route: "/account",
  icon: faUserCircle,
  label: "Account"
},{
  route: "/appointment",
  icon: faCalendarCheck,
  label: "Appointment"
}]

const Navigation = (props) => {
  const email = localStorage.getItem('email');

  const [coba, setCoba] = useState([]);
  useEffect(() => {

    const getData = async () => {
      axios.get("http://localhost:3000/usersstudent", { withCredentials: "true" })
        .then((response) => {
          setCoba(response.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtt = (coba.filter(
    item => item.email === email)
  );

  const role = filtt.map((i) => i.role)
  
  const Roles = () => {
    if (role == 'Student') {
      return (
        <Nav className="w-100 navbar fixed-bottom navbar-light d-block bottom-tab-nav" role="navigation">
        <div className=" d-flex flex-row justify-content-around w-100">
          {
            tabs.map((tab, index) =>(
              <NavItem key={index}>
                <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    <FontAwesomeIcon size="lg" icon={tab.icon}/>
                    <div className="bottom-tab-label">{tab.label}</div>
                  </div>
                </NavLink>
              </NavItem>
            ))
          }
        </div>
      </Nav>
      )
    } else {
      return (
        <Nav className="w-100 navbar fixed-bottom navbar-light d-block bottom-tab-nav" role="navigation">
        <div className=" d-flex flex-row justify-content-around w-100">
          {
            tabs.slice(0,3).map((tab, index) =>(
              <NavItem key={index}>
                <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    <FontAwesomeIcon size="lg" icon={tab.icon}/>
                    <div className="bottom-tab-label">{tab.label}</div>
                  </div>
                </NavLink>
              </NavItem>
            ))
          }
        </div>
      </Nav>
      )
    }
  }

  return (
    <div>
      <Roles/>
    </div>
  )
};

export default Navigation;
