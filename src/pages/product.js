import React from 'react';
// import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Nav, NavItem} from 'reactstrap';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function Product(props) {
  
  return (
    <div>
         <Nav className="w-100 navbar sticky-top navbar-light d-block d-lg-none mb-4 top-tab-nav" role="navigationtop" style={{ paddingTop: '5px', height: '50px'}}>
        <div className=" d-flex flex-row justify-content-between w-100">
        <div className="d-flex">
          <NavItem>
           
            <NavLink to="/home" className="top-nav-link mb-3" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faArrowLeft}/>
            </NavLink>
                
            
          </NavItem>
          
          <h5 className="user mb-3">Product Detail</h5>
          </div>
          <NavItem className="d-flex">
            <NavLink to="/cart" className="top-nav-link" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faShoppingCart}/>
            </NavLink>
          </NavItem>
        </div>
      </Nav>
        Product
      {/* <Switch>
        <Route
          path="/product/:id"
          render={({ match }) => (
            <Product
              recommendations={recommendations.find(
                (recommendations) => String(recommendations.id) === match.params.id
              )}
            />
          )}
        />
      </Switch> */}
      </div>
      
    
    
  )
  
};

export default Product;