import React , { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Nav, NavItem} from 'reactstrap';
import { NavLink, useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUp, faCheck, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const Course = () => {
  
  const { id } = useParams();
 
  const [showResults, setShowResults] = React.useState(true)
  // const [showResults2, setShowResults2] = React.useState(false)

  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const length = data.length;

  useEffect(() => {
    const getProductbyId = async () => {
      axios.get("http://localhost:3000/products/" + id,  {withCredentials : "true"})
        .then((response) => {
          setProduct(response.data);
        })
        .catch(error => {
          console.log(error.response)
      });
    };
    getProductbyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getProductby = async () => {
      axios.get("http://localhost:3000/product-unitsbyProductid/"+ id, {withCredentials : 'true'})
        .then((response) => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error.response)
      })
    };
    getProductby();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const total = data.reduce((acc, row) => acc + data.amount, 0);
    setTotalSum(total)
  }, [data]);

  const Results = () => {
    return (
      data.map((data, index)=>(
        <ul className="list-group mb-3">
          <li className="list-group-item list-account">
          <Link className="d-flex justify-content-between account-menu">
            <span>{data.name}</span>
            <FontAwesomeIcon size="lg" icon={faCheck}/>
          </Link>
          </li>
        </ul>
      ))
    );
  };

  return (
    <div>
      <div className="title-orange">
      <Nav className="w-100 navbar sticky-top navbar-light d-block d-lg-none top-tab-nav-white nav-orange" role="navigationtop" style={{ paddingTop: '8px', height: '57px'}}>
        <div className=" d-flex flex-row justify-content-between w-100">
        <div className="d-flex">
          <NavItem>
            <NavLink to="/home" className="top-nav-link-white mb-3" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faArrowLeft}/>
            </NavLink>
          </NavItem>
          <h5 className="user text-white mb-3">Course Progress</h5>
        </div>
        </div>
      </Nav>
      
      <div className="subtitle-orange">
       <div className="d-flex flex-row justify-content-center">
        <Card className=" w-75 align-content-center shadow rounded">
            <Card.Body>
            <Card.Title className="text-center">{product.name}</Card.Title>
            <Card.Subtitle className="text-muted text-center">0/{length}</Card.Subtitle>
            </Card.Body>
        </Card>
       </div>
      </div>
      </div>
      <div className="container" style={{height:"25vh"}}>
          <p className="text-muted my-2 text-center">Course Content</p>
          <div className="mt-4">
          <Link onClick={()=>setShowResults(!showResults)} className="d-flex justify-content-between account-menu">
            <span className="h5" style={{ color : '#ED933D' }}>Course Progress</span>
            
            { showResults ? <FontAwesomeIcon className="orange-icon" size="lg" icon={faArrowUp}/> : <FontAwesomeIcon className="orange-icon" size="lg" icon={faArrowDown}/> }
          </Link>
            <div className="pb-3">
            { showResults && <Results/> }
            </div>
          </div>
          {/* <div className="mt-4">
          <Link onClick={()=>setShowResults2(!showResults2)} className="d-flex justify-content-between account-menu">
            <span>Section 2 : Course Progress</span>
            { showResults2 ? <FontAwesomeIcon size="lg" icon={faArrowUp}/> : <FontAwesomeIcon size="lg" icon={faArrowDown}/> }
          </Link>
            <div>
            { showResults2 && <Results/> }
            </div>
          </div> */}
      </div>
      </div>
  )
  
};

export default Course;