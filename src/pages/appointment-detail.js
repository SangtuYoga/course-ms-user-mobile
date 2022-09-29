/*eslint-disable eqeqeq*/
import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Nav, NavItem } from 'reactstrap';
// import Spinner from 'react-bootstrap/Spinner';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const AppointmentDetail = (props) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  let history = useHistory();
  const [dates, setDates] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  console.log(date);

  useEffect(() => {
    const getProduct = async () => {
      axios.get("http://localhost:3000/products", { withCredentials: "true" })
        .then((response) => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
    getProduct();
    getSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [schedule, setSchedule] = useState([]);
  const getSchedule = async () => {
    axios.get("http://localhost:3000/class-schedules/" + id, { withCredentials: "true" })
      .then((response) => {
        setSchedule(response.data);
        setDates(response.data.date)
        setStartTime(response.data.start_time)
        setEndTime(response.data.end_time)
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const times = [{
    id: 1,
    start_time: '10:30:00',
    end_time: '12:30:00',
  },
  {
    id: 2,
    start_time: '11:30:00',
    end_time: '13:30:00',
  },
  {
    id: 3,
    start_time: '12:30:00',
    end_time: '14:30:00',
  },
  {
    id: 4,
    start_time: '13:30:00',
    end_time: '15:30:00',
  },
  ]

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
    setStartTime(event.target.value);
  };

  const [selected, setSelected] = React.useState("");
  let time = null;
  let options = null;

  if (selected === "10:30:00") {
    time = "12:30:00";
    setEndTime(data.end_time);
  } else if (selected === "11:30:00") {
    time = "13:30:00";
  } else if (selected === "12:30:00") {
    time = "14:30:00";
  } else if (selected === "13:30:00") {
    time = "15:30:00";
  }

  if (times) {
    options = times.map((end_time) => <option key={end_time} value={time}>{time}</option>);
  }

  // const HandleEdit = (id) => {
  //   axios.get("http://localhost:3000/schedules/" + id, { withCredentials: 'true' })
  //     .then((response) => {
  //       setDate(response.data.date);
  //       setStartTime(response.data.start_time);
  //       setEndTime(response.data.end_time);
  //     }).catch((error) => {
  //       setError(error.response.data);
  //     });
  // };

  const [msg, setMsg] = useState('');
  const updateSchedule = async (e) => {
    e.preventDefault();
    axios.patch("http://localhost:3000/class-schedules/" + id, {
      date: date,
      start_time: startTime,
      end_time: endTime,
    }, { withCredentials: 'true' })
      .then((res) => {
        console.log(res);
        history.push('/appointment');
      }).catch((error) => {
        console.log(error.response);
        if (error.response.status == 400 ){
          setMsg("Must Choose new Start Time and End Time!");
        }
      });

  }

  // const Loading = () => {
  //   return (
  //     <div className="mx-auto">
  //       <Spinner animation="border" variant="warning" />
  //     </div>
  //   );
  // };

  return (
    <div>
      <Nav className="w-100 navbar sticky-top navbar-light d-block mb-4 top-tab-nav" role="navigationtop" style={{ paddingTop: '8px', height: '57px' }}>
        <div className=" d-flex flex-row justify-content-between w-100">
          <div className="d-flex">
            <NavItem>

              <NavLink to="" onClick={history.goBack} className="top-nav-link mb-3" activeClassName="active">
                <FontAwesomeIcon size="2x" icon={faArrowLeft} />
              </NavLink>


            </NavItem>

            <h5 className="user mb-3">Class Schedule Detail</h5>
          </div>
        </div>
      </Nav>
      {/* <div>
        <p className="font-weight-bold px-2">Hello, let's grow for future!</p>
      </div> */}
      <div className="d-flex justify-content-center mb-3">
        <Card className="w-75">
          <Card.Body>
            <Card.Text className="d-flex flex-column text-center">
              {/* <div>
                <span className="text-success">3h 30min</span>
              </div> */}
              <div>
                <span className="h6">{(data.filter(item => item.id == schedule.product_id)).map((item) => item.name)}</span>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Form onSubmit={updateSchedule}>
        <div >
          <p className="font-weight-bold px-2 h4 mt-3">Pick a date</p>
          <Form.Group className="mb-3" controlId="formBasicphone">
            <DatePicker
              wrapperClassName="date-picker"
              className="form-control form-control-lg w-90 mx-auto"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat='yyyy-MM-dd'
              minDate={new Date()}
              maxDate={addDays(new Date(), 14)}
              popperPlacement="bottom"
              placeholderText={schedule.date}
            />
            {/* <Form.Control
                type="date"
                name="duedate"
                placeholder="Due date"
                value={schedule.date}
                onChange={(e) => setDate(e.target.value)}
              /> */}
          </Form.Group>
        </div>
        <p className="font-weight-bold px-2 h4 mt-3">Pick a time</p>
        {msg ? (
           <div className="d-flex justify-content-center">
              <div className="fs-12 alert alert-danger w-75 rounded" role="alert">
                {msg}
            </div>
           </div>)
            : (<></>)}
        <div className="d-flex justify-content-center">
          <div className="w-75">
            <Form.Group className="d-flex flex-column justify-content-around mb-3" controlId="starttimeselect">
              <Form.Label>Start time ({schedule.start_time})</Form.Label>
              <Form.Select aria-label="Default select example" className="mb-3 form-control form-control-lg rounded text-center" id="starttimeselect" onChange={changeSelectOptionHandler} required>
                <option value={schedule.start_time} selected disabled hidden>{schedule.start_time}</option>
                {times.map((item) => (
                  <option value={item.start_time}>{item.start_time}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-75">
            <Form.Group className="d-flex flex-column justify-content-around mb-3" controlId="endtimeselect">
              <Form.Label>End time ({schedule.end_time})</Form.Label>
              <Form.Select aria-label="Default select example" className="mb-3 form-control form-control-lg rounded text-center" id="endtimeselect" onChange={(e) => setEndTime(e.target.value)} >
                <option value={schedule.end_time} selected disabled hidden>{schedule.end_time}</option>
                {times.map((item) => (
                  <option value={item.end_time}>{item.end_time}</option>
                ))}
                {/* {times.slice(0,2).map((end_time) => <option key={end_time} value={time}>{time}</option>)} */}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="container d-flex flex-row justify-content-between fixed-bottom" id="">
          <Button className="btn btn-primary btn-lg shadow rounded-btn mb-3 w-45" onClick={history.goBack} type="button">Back</Button>
          <Button variant="primary" type="submit" className="btn btn-success btn-lg shadow rounded-btn mb-3 w-45">
            Save
          </Button>
        </div>
      </Form>
      <div style={{ paddingBottom: '70px' }}>
      </div>
    </div>
  )
};

export default AppointmentDetail;
