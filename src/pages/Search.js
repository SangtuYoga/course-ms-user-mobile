import React from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowLeft, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

const recommendations = [{
  id:1,
  name : 'PHP My Admin',
  kategori : 'Front-End',
  subtitle: 'Ini adalah kelas php',
  price : '750.000',
  star : '4',
  trainer : 'Alviantara',
  level : 'Beginer'
},{
  id:2,
  name : 'Computer Science 2',
  kategori : 'Science',
  subtitle: 'Ini adalah kelas computer science',
  price : '800.000',
  star : '3.9',
  trainer : 'Yudi Utama',
  level : 'All Level'
},{
  id:3,
  name : 'Robotic',
  kategori : 'Robotic',
  subtitle: 'Ini adalah kelas robotic',
  price : '600.000',
  star : '4.5',
  trainer : 'Wahyu Wastuguna',
  level : 'Intermediate'
}]

const Search = (props) => {

  const [filterText, setFilterText] = React.useState('');
  const filteredItems = recommendations.filter(
    item => item.name.toLowerCase().includes(filterText.toLowerCase())
  );  

  return (
    <div>
      <Nav className="w-100 navbar sticky-top navbar-light d-block d-lg-none mb-4 top-tab-nav" role="navigationtop" style={{ paddingTop: '8px', height: '57px'}}>
        <div className=" d-flex flex-row justify-content-between w-100">
        <div className="d-flex">
          <NavItem>
           
            <NavLink to="/home" className="top-nav-link mb-3" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faArrowLeft}/>
            </NavLink>
                
            
          </NavItem>
          
          <h5 className="user mb-3">Explore</h5>
          </div>
          <NavItem className="d-flex">
            <NavLink to="/cart" className="top-nav-link" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faShoppingCart}/>
            </NavLink>
          </NavItem>
        </div>
      </Nav>
      <div className="d-flex justify-content-center text-white">
        <div className="input-group custom-search w-75">
          <input type="text" className="form-control form-control-lg custom-search-input rounded-pill" placeholder="Search for a Course"  value={filterText} onChange={(e) => setFilterText(e.target.value)}/>
          <button className="btn btn-primary custom-search-botton rounded-pill" type="submit">
            <FontAwesomeIcon size="lg" icon={faSearch}/>
          </button>  
        </div>
      </div>
        <div className="d-flex justify-content-center mt-3">
          Search by Category
        </div>
        <div className="container">
        <div className="d-flex flex-row justify-content-around mb-3">
          {
            recommendations.map((recommendations, index)=>(
            <button type="button" className="btn btn-primary btn-sm rounded-pill w-25">{recommendations.kategori}</button>
            ))
          }
        </div>    
        </div>
        
      <div className="justify-content-center m-3">
        <p className="text-center">-- Recommendation -- </p>
      </div>
      <div className="d-flex flex-column justify-content-center mb-3">
            {
              filteredItems.map((recommendations, index)=>(
                <div className="d-flex justify-content-center mb-3">
                <Card className="w-75 align-content-center shadow rounded" key={`recommendations-${index}`}>
                <Card.Body>
                <Card.Title>{recommendations.name}</Card.Title>
                <Card.Subtitle className="text-muted">{recommendations.subtitle}</Card.Subtitle>
                <Card.Text>
                  <p style={{ marginBottom: '0' }}>Price : {recommendations.price}</p>
                  <span>
                  <FontAwesomeIcon icon={faStar}size="xs" color="yellow" />{recommendations.star} </span>
                  <span>By {recommendations.trainer} </span>
                  <span>{recommendations.level}</span>
                </Card.Text>

                <Link to={`/product/${recommendations.id}`}>More Details</Link>
                </Card.Body>
                </Card>
                </div>
              ))
            }
      </div>
      <div style={{ paddingBottom: '70px' }}>
      </div>
    </div>
  )
};

export default Search;
