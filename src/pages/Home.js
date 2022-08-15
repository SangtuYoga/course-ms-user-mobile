import React from 'react';
import "../App.css";
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Switch, Route, Redirect } from "react-router-dom";
import { Nav, NavItem} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClipboard } from '@fortawesome/free-solid-svg-icons';

const course = [{
  id:1,
  name: 'Computer Science',
  star: '4',
  trainer: 'Pande',
  level: 'Beginer',
  progress: '70',
  variant: 'primary'
},
{
  id:2,
  name: 'Data Analysis',
  star: '5',
  trainer: 'Dyah',
  level: 'Intermediate',
  progress: '40',
  variant: 'success'
},
{
  id:3,
  name: 'UI/UX',
  star: '4',
  trainer: 'Wahyu',
  level: 'Expert',
  progress: '90',
  variant: 'danger'
},
]

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

function ProductDetails(props) {
  const { id, name } = props.product;

  return (
    <div>
      <div>
        <h1>{id}</h1>
        <h1>{name}</h1>
      </div>
    </div>
  );
}
function Home ({autorized}){
  if (!autorized) {
    return <Redirect to="/"/>;
  }

  return (
    <div>
      <Nav className="w-100 navbar sticky-top navbar-light d-block d-lg-none mb-4 top-tab-nav" role="navigationtop">
        <div className=" d-flex flex-row justify-content-between w-100">
          <NavItem>
              <img
                  alt=""
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />{''}
                <div className="user">
                <p className="h6">Hai, <span style={{ color : '#ED933D' }}>Wahyu Wastuguna</span></p>
              </div>
          </NavItem>
          <NavItem className="d-flex" style={{ paddingTop: '5px' }}>
            <NavLink to="/note" className="top-nav-link" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faClipboard}/>
            </NavLink>
          </NavItem>
        </div>
      </Nav>
      <div className="d-flex justify-content-center text-white">
      <Card className="text-center w-75 border-dark bg-card">
        <Card.Body>
          <Card.Title className="text-center">Your Progress in Course</Card.Title>
          {
            course.map((course, index)=>(
              
              <Card.Text key={`course-${index}`}>
                <Card.Text style={{ marginBottom: '0' }}><b>{course.name}</b></Card.Text>
                  <div className="justify-content-around">
                  <span>
                  <FontAwesomeIcon icon={faStar} size="xs" color="yellow" />{course.star} </span>
                  <span>By {course.trainer}</span>
                  <span> {course.level}</span>
                  </div>
                  <ProgressBar variant={course.variant} now={course.progress} />
              </Card.Text>
            ))
          }
        </Card.Body>
      </Card>
      </div>
      <div className="justify-content-center m-3">
        <p className="text-center">-- Recommendation -- </p>
      </div>
      <div className="d-flex flex-column justify-content-center mb-3">
            {
              recommendations.map((recommendations, index)=>(
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

                <Link to={{pathname:`/product/${recommendations.id}`, state:{id:recommendations.id, name:recommendations.name}}} >More Details</Link>
                </Card.Body>
                </Card>
                </div>
              ))
            }
      </div>
      <Switch>
        <Route
          path="/product/:id?"
          render={({ match }) => (
            <ProductDetails
              recommendations={recommendations.find(
                (recommendations) => String(recommendations.id) === match.params.id
              )}
            />
          )}
        />
      </Switch>
      <div style={{ paddingBottom: '70px' }}>
      </div>
    </div>
    
  )
};

export default Home;
