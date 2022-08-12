import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" role="navigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Brand</a>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink to="/search" className="nav-link">
                  Explore
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/account" className="nav-link">
                  Account
                </NavLink>
              </NavItem>
            </Nav>
        </div>
      </nav>
      <Nav className="w-100 navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
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
    </div>
  )
};

export default Navigation;
