import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem} from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Navigation from "../components/Navigation";

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
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      axios.get("http://localhost:3000/products", {withCredentials : "true"})
        .then((response) => {
          setData(response.data);
          console.log(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error.response);
      });
    };
    getProduct();
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCategory = async () => {
    setIsLoading(true);
    axios.get("http://localhost:3000/product-categories", {withCredentials : "true"})
      .then((response) => {
        setCategory(response.data);
        console.log(category);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.response);
    });
  };

  const [filterText, setFilterText] = React.useState('');
  const filteredItems = data.filter(
    item => item.name.toLowerCase().includes(filterText.toLowerCase())
  );  

  const upperdata = category.filter(item => 
  item.name.charAt(0).toUpperCase() + item.name.slice(1))

  console.log(upperdata);

  const Loading = () => {
    return (
      <div className="mx-auto">
      <Spinner animation="border" variant="warning"/>
      </div>
    );
  };

  const ShowProducts = () => {
    return (
      filteredItems.map((data, index)=>(
        <div className="d-flex justify-content-center mb-3">
        <Card className="w-90 align-content-center shadow rounded-product" key={`data-${index}`}>
        <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Subtitle className="text-muted">{data.description}</Card.Subtitle>
        <Card.Text>
          <p style={{ marginBottom: '0' }}>Price : {data.price}</p>
          <span>Days Periode : {data.days_period} </span>
        </Card.Text>

        <Link to={`/product/${data.id}`}>More Details</Link>
        </Card.Body>
        </Card>
        </div>
      ))
    );
  };

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
          <h5 className="user mb-3">Explore</h5>
          </div>
        </div>
      </Nav>
      <div className="d-flex justify-content-center text-white">
        <div className="input-group custom-search w-90">
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
        <div className="d-flex flex-row rows justify-content-around mb-3 mt-3">
          {
            upperdata.map((category)=>(
            <button type="button" className="fs-12 btn btn-primary btn-sm rounded-pill w-30 mb-3" value={category.id} style={{textTransform: 'capitalize'}}>{category.name}</button>
            ))
          }
        </div>   
        </div>
        
      <div className="justify-content-center m-3">
        <div className="mx-auto strike">
          <span>All Course</span>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center mb-3">
      {isLoading === true ? <Loading /> : <ShowProducts />}
      </div>
      <div style={{ paddingBottom: '70px' }}>
      </div>
      <Navigation/>
    </div>
  )
};

export default Search;
