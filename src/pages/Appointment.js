/*eslint-disable eqeqeq*/
import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem } from 'reactstrap';
// import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Navigation from "../components/Navigation";

const Appointment = (props) => {
  const [data, setData] = useState([]);
  let history = useHistory();
  const email = localStorage.getItem('email');

  useEffect(() => {
    const getProduct = async () => {
      axios.get("http://localhost:3000/products", { withCredentials: "true" })
        .then((response) => {
          setData(response.data);
          console.log(data);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
    getProduct();
    getSchedule();
    getStudentCourse();
    getNama();
    getStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [coba, setCoba] = useState([]);
  const getNama = async () => {
    axios.get("http://localhost:3000/usersstudent", { withCredentials: "true" })
      .then((response) => {
        setCoba(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const [studentcourse, setStudentCourse] = useState([]);
  const getStudentCourse = async () => {
    axios.get("http://localhost:3000/student-courses", { withCredentials: "true" })
      .then((response) => {
        setStudentCourse(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const [student, setStudent] = useState([]);
  const getStudent = async () => {
    axios.get("http://localhost:3000/students", { withCredentials: "true" })
      .then((response) => {
        setStudent(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const [schedule, setSchedule] = useState([]);
  const getSchedule = async () => {
    axios.get("http://localhost:3000/class-schedules", { withCredentials: "true" })
      .then((response) => {
        setSchedule(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const filtt = (coba.filter(
    item => item.email === email)
  );

  const iduser = filtt.map((i) => i.id)

  const filttidstudent = (student.filter(
    item => item.user_id == iduser)
  );

  const idstudent = filttidstudent.map((i) => i.id)

  const filttidschedule = (studentcourse.filter(
    item => item.student_id == idstudent)
  );

  const idcourse = filttidschedule.map((i) => i.schedule_id)

  const filttidclass = (schedule.filter(({ id }) => idcourse.includes(id))
  );

  const sortdataschedule = filttidclass.map(obj => {
    return {
      ...obj,
      date: new Date(obj.date),
      // timestart: new Date(new Date(obj.start_time)).toLocaleTimeString([], { timeStyle: 'short' }),
      // timeend: new Date(obj.end_time).toLocaleTimeString([], { timeStyle: 'short' }),
      dateonly: new Date(new Date(obj.date)).toLocaleDateString("sv-SE")
    }
  })
    .sort((a, b) => a.date - b.date)

  // const datesch = sortdataschedule.map((i) => i.dateonly)

  // const dateschedule = (schedule.filter(({ date }) => datesch.includes(date))
  // );

  console.log(iduser);
  console.log(filttidclass);

  // const Loading = () => {
  //   return (
  //     <div className="mx-auto">
  //       <Spinner animation="border" variant="warning" />
  //     </div>
  //   );
  // };

  // this gives an object with dates as keys
  const groups = sortdataschedule.reduce((groups, schedule) => {
    const dateday = schedule.date.toLocaleDateString('en-us', {weekday:'long'});
    const date = dateday +', '+ schedule.date.toLocaleDateString("sv-SE");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(schedule);
    return groups;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      datas: groups[date]
    };
  });

  const array2 = groupArrays.map(({ date, datas }) =>
    datas.map(({ id, employee_id, product_id, dateonly, end_time, start_time }) => [
      id,
      employee_id,
      product_id,
      dateonly,
      end_time,
      start_time
    ])
  )

  console.log(groupArrays);
  console.log(sortdataschedule);

  const ShowSchedulebyDate = () => {
    return (
      groupArrays.map((schedule, index) => {
        return (
          <div className="d-flex justify-content-center mb-3">
            <Card className="appointment-card w-90 align-content-center shadow rounded-product" key={`schedule-${index}`}>
              <Card.Body>
                <Card.Title>{schedule.date}</Card.Title>
                <Card.Text className="d-flex flex-column">
                {schedule.datas.map(datas => 
                  <Link to={`/appointment-detail/${datas.id}`} className="appointment-link">
                    <div className="d-flex flex-column">
                      <span>
                        {/* {schedule.date == dateschedule.date ? 
                      <span>{(schedule.filter(item => item.date == dateschedule.date)).map((item) => item.id)}</span>
                      : 
                      <span>{(schedule.filter(item => item.date == dateschedule.date)).map((item) => item.id)}</span>
                      } */}
                        {(data.filter(item => item.id == datas.product_id)).map((item) => item.name)}
                      </span>
                      <span className="fs-12 my-auto text-d">
                        ({datas.start_time} - {datas.end_time})
                      </span>
                    </div>
                  </Link>
                  )}
                </Card.Text>

              </Card.Body>
            </Card>
          </div>
        )
      })
    );
  };

  const ShowSchedule = () => {
    return (
      sortdataschedule.map((schedule, index) => {
        return (
          <div className="d-flex justify-content-center mb-3">
            <Card className="appointment-card w-90 align-content-center shadow rounded-product" key={`schedule-${index}`}>
              <Card.Body>
                <Card.Title>{schedule.dateonly}</Card.Title>
                <Card.Text className="d-flex flex-column">
                  <Link to={`/appointment-detail/${schedule.id}`} className="appointment-link">
                    <div className="d-flex flex-column">
                      <span>
                        {/* {schedule.date == dateschedule.date ? 
                        <span>{(schedule.filter(item => item.date == dateschedule.date)).map((item) => item.id)}</span>
                        : 
                        <span>{(schedule.filter(item => item.date == dateschedule.date)).map((item) => item.id)}</span>
                        } */}
                        {(data.filter(item => item.id == schedule.product_id)).map((item) => item.name)}
                      </span>
                      <span className="fs-12 my-auto text-d">
                        ({schedule.start_time} - {schedule.end_time})
                      </span>
                    </div>
                  </Link>
                </Card.Text>

              </Card.Body>
            </Card>
          </div>
        )
      })
    );
  };

  // const ShowSchedule = () => {
  //   return (
  //     schedule.map((schedule, index)=>(
  //       <div className="mb-3">
  //       {/* <Link to={`/appointment-detail/${schedule.id}`}> */}
  //       <Link to={`/appointment-detail`}>  
  //       <Card className="appointment-card w-100 shadow" key={`schedule-${index}`}>
  //         <Card.Body className="appointment-body">
  //         {/* <div className="d-flex flex-column mx-auto text-center">
  //           <span className="h3">{schedule.day_name}</span>
  //           <span className="h3">{schedule.day}</span>
  //         </div> */}
  //           <Card.Text className="d-flex flex-row">
  //             <div className="d-flex my-auto flex-column text-center">
  //               <span className="fs-1">{schedule.day_name}</span>
  //               <span className="fs-1">{schedule.day}</span>
  //             </div>
  //             <div className="d-flex flex-column text-start" style={{marginLeft: "30px"}}>
  //               <span>{schedule.name} ({schedule.start_time} - {schedule.end_time})</span>
  //               <span>{schedule.name} ({schedule.start_time} - {schedule.end_time})</span>
  //             </div>
  //           </Card.Text>
  //         </Card.Body>
  //       </Card>
  //       </Link>
  //       </div>
  //     ))
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

            <h5 className="user mb-3">Class Schedule</h5>
          </div>
        </div>
      </Nav>
      <div className="d-flex justify-content-center">
        <p className="font-weight-bold">Time Table</p>
      </div>
      <div className="d-flex flex-column justify-content-center mb-3">
        <ShowSchedulebyDate />
      </div>
      <div style={{ paddingBottom: '70px' }}>
      </div>
      <Navigation />
    </div>
  )
};

export default Appointment;
