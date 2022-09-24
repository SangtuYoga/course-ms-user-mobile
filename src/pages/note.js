import React, { useEffect, useState } from "react";
import "../App.css";
import { Nav, NavItem } from 'reactstrap';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const Note = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const email = localStorage.getItem('email');

  useEffect(() => {

    const getNotes = async () => {
      setIsLoading(true);
      axios.get("http://localhost:3000/notes", { withCredentials: "true" })
        .then((response) => {
          setData(response.data);
          console.log(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
    getNotes();
    getStudent();
    getNama();
    getEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [coba, setCoba] = useState([]);
  const getNama = async () => {
    setIsLoading(true);
    axios.get("http://localhost:3000/usersstudent", { withCredentials: "true" })
      .then((response) => {
        setCoba(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const [student, setStudent] = useState([]);
  const getStudent = async () => {
    setIsLoading(true);
    axios.get("http://localhost:3000/students", { withCredentials: "true" })
      .then((response) => {
        setStudent(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const [employee, setEmployee] = useState([]);
  const getEmployee = async () => {
    setIsLoading(true);
    axios.get("http://localhost:3000/employee", { withCredentials: "true" })
      .then((response) => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const filtt = (coba.filter(
    item => item.email === email)
  );

  const role = filtt.map((i) => i.role)
  const iduser = filtt.map((i) => i.id)
  const idreciever = data.map((i) => i.student_id)
  const idreciever2 = data.map((i) => i.employee_id)

  const filttidstudent = (student.filter(({ id }) => idreciever.includes(id))
  );

  const filteridemployee = (employee.filter(
    item => item.id == idreciever2)
  );

  const filteridemp = (employee.filter(({ id }) => idreciever2.includes(id))
  );

  const filterestd = (student.filter(
    item => item.user_id == iduser)
  )

  const idstudent = filterestd.map((i) => i.id)

  const filterdatastd = (data.filter(
    item => item.student_id == idstudent)
  );

  const datarolestd = filterdatastd.filter((i) => i.role == "Employee")

  const filteremp = (employee.filter(
    item => item.user_id == iduser)
  )

  const idemployee = filteremp.map((i) => i.id)

  const filterdataemp = (data.filter(
    item => item.employee_id == idemployee)
  );

  const dataroleemp = filterdataemp.filter((i) => i.role == "Student")


  const sortfilterdatastd = filterdatastd.map(obj => {
    return {
      ...obj,
      date: new Date(obj.created_at),
      time: new Date(new Date(obj.created_at) * 1000).toLocaleTimeString(),
      dateonly: new Date(new Date(obj.created_at)).toLocaleString()
    }
  })
    .sort((a, b) => b.date - a.date)

  const sortfilterdataemp = filterdataemp.map(obj => {
    return {
      ...obj,
      date: new Date(obj.created_at),
      time: new Date(new Date(obj.created_at) * 1000).toLocaleTimeString(),
      dateonly: new Date(new Date(obj.created_at)).toLocaleString()
    }
  })
    .sort((a, b) => b.date - a.date)
    
  console.log(filterdatastd);
  console.log(datarolestd);
  console.log(sortfilterdatastd);

  const Loading = () => {
    return (
      <div className="mx-auto" style={{ textAlign: 'center' }}>
        <Spinner animation="border" variant="warning" />
      </div>
    );
  };

  const ViewNotes = () => {
    if (role == 'Student') {
      return (
        sortfilterdatastd.map((data, index) => {
          if(data.role == 'Student'){
          return (
              <div className="d-flex justify-content-center mb-3">
              <Card className="note-card w-90 align-content-center shadow rounded-product" key={`data-${index}`}>
                <Card.Body>
                  <Card.Title className="d-flex flex-column">
                    <span className="fs-12 my-auto d-flex justify-content-end text-white">To :&nbsp;
                      {(employee.filter(item => item.id == data.employee_id)).map((item) => item.name_employee)}
                    </span>
                    <span className="fs-12 my-auto d-flex justify-content-end text-d">
                      {data.dateonly}
                    </span>
                  </Card.Title>
                  <Card.Subtitle className="">
                    <span className="h6 text-white">{data.title}</span>
                  </Card.Subtitle>
                  <Card.Text>

                    <p className="text-white" style={{ fontSize: "14px" }}>{data.description}</p>
                    {/* <span>Days Periode : {data.days_period} </span> */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )
          
        }else{
          return(
            <div className="d-flex justify-content-center mb-3">
              <Card className="w-90 align-content-center shadow rounded-product" key={`data-${index}`}>
                <Card.Body>
                  <Card.Title className="d-flex flex-column">
                    <span className="fs-12 my-auto d-flex justify-content-end">From :&nbsp;
                    {(employee.filter(item => item.id == data.employee_id)).map((item) => item.name_employee)}
                    </span>
                    <span className="fs-12 my-auto d-flex justify-content-end text-orange">
                      {data.dateonly}
                    </span>
                  </Card.Title>
                  <Card.Subtitle className="">
                    <span className="h6">{data.title}</span>
                  </Card.Subtitle>
                  <Card.Text>

                    <p className="text-muted" style={{ fontSize: "14px" }}>{data.description}</p>
                    {/* <span>Days Periode : {data.days_period} </span> */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )
        }
        })
      )
    } else {
      return (
        sortfilterdataemp.map((data, index) => {
          if(data.role == 'Employee'){
            return (
                <div className="d-flex justify-content-center mb-3">
                <Card className="w-90 align-content-center shadow rounded-product" key={`data-${index}`}>
                  <Card.Body>
                    <Card.Title className="d-flex flex-column">
                      <span className="fs-12 my-auto d-flex justify-content-end">To :&nbsp;
                      {(student.filter(item => item.id == data.student_id)).map((item) => item.name_student)}
                      </span>
                      <span className="fs-12 my-auto d-flex justify-content-end text-orange">
                        {data.dateonly}
                      </span>
                    </Card.Title>
                    <Card.Subtitle className="">
                      <span className="h6">{data.title}</span>
                    </Card.Subtitle>
                    <Card.Text>
  
                      <p className="text-muted" style={{ fontSize: "14px" }}>{data.description}</p>
                      {/* <span>Days Periode : {data.days_period} </span> */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            )
            
          }else{
            return(
              <div className="d-flex justify-content-center mb-3">
                <Card  className="note-card w-90 align-content-center shadow rounded-product" key={`data-${index}`}>
                  <Card.Body>
                    <Card.Title className="d-flex flex-column">
                      <span className="fs-12 my-auto d-flex justify-content-end text-white">From :&nbsp;
                      {(student.filter(item => item.id == data.student_id)).map((item) => item.name_student)}
                      </span>
                      <span className="fs-12 my-auto d-flex justify-content-end text-d">
                        {data.dateonly}
                      </span>
                    </Card.Title>
                    <Card.Subtitle className="">
                      <span className="h6 text-white">{data.title}</span>
                    </Card.Subtitle>
                    <Card.Text>
  
                      <p className="text-white" style={{ fontSize: "14px" }}>{data.description}</p>
                      {/* <span>Days Periode : {data.days_period} </span> */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            )
          }
        })
      )
    }
  }

  return (
    <div>
      <Nav className="w-100 navbar sticky-top navbar-light d-block mb-4 top-tab-nav" role="navigationtop" style={{ paddingTop: '8px', height: '57px' }}>
        <div className=" d-flex flex-row justify-content-between w-100">
          <div className="d-flex">
            <NavItem>
              <NavLink to="/home" className="top-nav-link mb-3" activeClassName="active">
                <FontAwesomeIcon size="2x" icon={faArrowLeft} />
              </NavLink>
            </NavItem>
            <h5 className="user mb-3">Note</h5>
          </div>

          <NavItem className="d-flex" style={{ paddingTop: '5px' }}>
            <NavLink to="/create-note" className="top-nav-link" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faPen} />
            </NavLink>
          </NavItem>
        </div>
      </Nav>
      <div>
        {isLoading === true ? <Loading /> : <ViewNotes />}
      </div>
    </div>
  )
};

export default Note;
