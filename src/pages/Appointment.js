import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem} from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const Appointment = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      axios.get("https://630333660de3cd918b2fafe0.mockapi.io/cms/products")
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const schedule = [{
    id:1,
    name: 'Website HTML',
    start_time: '13:00',
    end_time: '15:00',
    day_name: 'Mon',
    day: '05',
    month: '09',
    year: '2022'
  },
  {
    id:2,
    name: 'Arduino',
    start_time: '15:00',
    end_time: '16:00',
    day_name: 'Tues',
    day: '06',
    month: '09',
    year: '2022'
  },
  {
    id:3,
    name: 'Basis Data',
    start_time: '15:00',
    end_time: '16:00',
    day_name: 'Wed',
    day: '07',
    month: '09',
    year: '2022'
  },
  {
    id:4,
    name: 'Website HTML',
    start_time: '15:00',
    end_time: '16:00',
    day_name: 'Thurs',
    day: '09',
    month: '09',
    year: '2022'
  },
  ]

  const Loading = () => {
    return (
      <div className="mx-auto">
      <Spinner animation="border" variant="warning"/>
      </div>
    );
  };

  const ShowProducts = () => {
    return (
      data.map((data, index)=>(
        <div className="d-flex justify-content-center mb-3">
        <Card className="w-90 align-content-center shadow rounded" key={`data-${index}`}>
        <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Subtitle className="text-muted">{data.description}</Card.Subtitle>
        <Card.Text>
          <p style={{ marginBottom: '0' }}>Price : {data.price}</p>
          <span>Days Periode : {data.days_periode} </span>
        </Card.Text>

        <Link to={`/product/${data.id}`}>More Details</Link>
        </Card.Body>
        </Card>
        </div>
      ))
    );
  };

  const ShowSchedule = () => {
    return (
      schedule.map((schedule, index)=>(
        <div className="d-flex justify-content-between flex-row mb-3">
        <div className="d-flex flex-column mx-auto text-center">
          <span className="h3">{schedule.day_name}</span>
          <span className="h3">{schedule.day}</span>
        </div>
        <div>
        {/* <Link to={`/appointment-detail/${schedule.id}`}> */}
        <Link to={`/appointment-detail`}>  
        <Card className="appointment-card w-100 shadow" key={`schedule-${index}`}>
          <Card.Body className="appointment-body">
            <Card.Text className="mx-4 d-flex flex-column justify-content-between">
              <div>
                <span>{schedule.name}</span>
              </div>
              <div>
                <span>{schedule.start_time} - {schedule.end_time}</span>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        </Link>
        </div>
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
          
          <h5 className="user mb-3">Class Schedule</h5>
          </div>
        </div>
      </Nav>
      <div className="d-flex justify-content-center">
        <p className="font-weight-bold">Time Table</p>
      </div>
      <ShowSchedule/>
    </div>
  )
};

export default Appointment;
