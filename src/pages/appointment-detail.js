import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem} from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const AppointmentDetail = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  const [startDate, setStartDate] = useState(null);
   
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
        <Link to={`/schedule-detail/${schedule.id}`}> 
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
          
          <h5 className="user mb-3">Class Schedule Detail</h5>
          </div>
        </div>
      </Nav>
      <div>
      <p className="font-weight-bold px-2">Hello, let's grow for future!</p>
      </div>
      <div className="d-flex justify-content-center mb-3">
      <Card className="">
        <Card.Body>
          <Card.Text className="d-flex flex-column">
            <div>
              <span className="text-success">3h 30min</span>
            </div>
            <div>
              <span className="h3">UI Advanced</span>
            </div>
            <div>
              <span>Advanced mobile interface design</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
      <div >
      <p className="font-weight-bold px-2 h4 mt-3">Pick a date</p>
      <DatePicker
      wrapperClassName="date-picker"
      className="form-control form-control-lg w-90 mx-auto"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={new Date()}
      maxDate={addDays(new Date(), 14)}
      popperPlacement="bottom"
      placeholderText="Select a date between today and 5 days in the future"
    />
      </div>
      <p className="font-weight-bold px-2 h4 mt-3">Pick a time</p>
      <div className="d-flex flex-row justify-content-around mb-3">
      <button type="button" className="btn btn-light btn-lg rounded w-45">09.30</button>
      <button type="button" className="btn btn-light btn-lg rounded w-45">10.30</button>
      </div>
      <div className="d-flex flex-row justify-content-around">
      <button type="button" className="btn btn-light btn-lg rounded w-45">11.30</button>
      <button type="button" className="btn btn-light btn-lg rounded w-45">12.30</button>
      </div>
      <div className="container d-flex flex-row justify-content-between fixed-bottom" id="">
          <button className="btn btn-primary btn-lg shadow rounded-btn mb-3 w-45" onClick={history.goBack} type="button">Back</button>
          <button className="btn btn-success btn-lg shadow rounded-btn mb-3 w-45" type="button">Save</button>
       </div>
    </div>
  )
};

export default AppointmentDetail;
