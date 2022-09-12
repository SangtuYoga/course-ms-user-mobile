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
    </div>
  )
};

export default Navigation;
