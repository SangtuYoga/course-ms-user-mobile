import React , { useEffect, useState } from 'react';
import logokodak from '../logo-kodak.svg';
import Card from 'react-bootstrap/Card';
import { Nav, NavItem} from 'reactstrap';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTag, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const Product = (props) => {
  const { id } = useParams();
  let history = useHistory();
  console.log(id);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getProductbyId = async () => {
      axios.get("http://localhost:3000/products/" + id,  {withCredentials : "true"})
        .then((response) => {
          setData(response.data);
          console.log(data);
        })
        .catch(error => {
          console.log(error.response)
      });
    };
    getProductbyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="title-orange">
      <Nav className="w-100 navbar sticky-top navbar-light d-block top-tab-nav-white nav-orange" role="navigationtop" style={{ paddingTop: '8px', height: '57px'}}>
        <div className=" d-flex flex-row justify-content-between w-100">
        <div className="d-flex">
          <NavItem>
            <NavLink to="" onClick={history.goBack} className="top-nav-link-white mb-3" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faArrowLeft}/>
            </NavLink>
          </NavItem>
          
          <h5 className="user text-white mb-3">Product Detail</h5>
          </div>
        </div>
      </Nav>
      
      <div className="subtitle-orange">
       <div className="d-flex flex-row" style={{paddingTop: "25px"}}>
       <img
          alt=""
          src={logokodak}
          width="100"
          height="100"
          className="rounded-circle logo"
        />{''}
        <div className="mx-auto d-flex flex-column my-auto mx-auto">
          <p className="text-white h5">
          {data.name}
          </p>
        </div>
       </div>
      </div>
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
      <div className="container" style={{height:"25vh"}}>
          <p className="text-muted my-2">Description</p>
          <p className="description">{data.description}</p>
          {/* <div id="module">
            <p class="collapse" id="collapseExample" aria-expanded="false">
            {recommendations[id].subtitle}
            </p>
            <Link role="button" class="collapsed" data-toggle="collapse" id="#collapseExample" aria-expanded="false" aria-controls="collapseExample"/>
          </div> */}
      </div>
      <div class="mx-auto strike">
        <span>Detail</span>
      </div>
      <div class="container">
      <Card className="rounded-card">
        <Card.Body>
          <Card.Text className="mx-4 d-flex flex-row justify-content-between">
            <div>
              <FontAwesomeIcon size="sm" icon={faClock}/>
              <span> {data.days_period} Days</span>
            </div>
            <div>
              <FontAwesomeIcon size="sm" icon={faTag}/>
              <span> Rp. {data.price}</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
      <div style={{ paddingBottom: '70px' }}>
      </div>
      {/* <div className="container d-flex flex-row justify-content-between fixed-bottom" id="">
          <button className="btn btn-primary btn-lg shadow rounded-btn mb-3" type="button">Course Progress</button>
          <button className="btn btn-success btn-lg shadow rounded-btn mb-3" type="button">Add to Cart</button>
       </div> */}
      </div>
    
    
  )
  
};

export default Product;