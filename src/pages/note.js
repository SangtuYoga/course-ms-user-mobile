import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

const Note = () =>{
  let history = useHistory();

  return (
    <div>
      <Nav className="w-100 navbar sticky-top navbar-light d-block mb-4 top-tab-nav" role="navigationtop" style={{ paddingTop: '8px', height: '57px'}}>
        <div className=" d-flex flex-row justify-content-between w-100">
        <div className="d-flex">
          <NavItem>
           
            <NavLink to="" onClick={history.goBack} className="top-nav-link mb-3" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faArrowLeft}/>
            </NavLink>
                
            
          </NavItem>
          
          <h5 className="user mb-3">Note</h5>
          </div>
        </div>
      </Nav>
      <div>
        Note
      </div>
    </div>
  )
};

export default Note;
