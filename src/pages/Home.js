import React, { useEffect, useState } from "react";
import "../App.css";
import usericon from '../assets/user-icon.png'
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Nav, NavItem } from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Navigation from "../components/Navigation";

/* eslint eqeqeq: 0 */
const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const email = localStorage.getItem('email');

  useEffect(() => {

    const getProduct = async () => {
      setIsLoading(true);
      axios.get("http://localhost:3000/products", { withCredentials: "true" })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
    getProduct();
    getNama();
    getStudent();
    getSchedule();
    getStudentCourse();
    getUnit();
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

  const [schedule, setSchedule] = useState([]);
  const getSchedule = async () => {
    setIsLoading(true);
    axios.get("http://localhost:3000/class-schedules", { withCredentials: "true" })
      .then((response) => {
        setSchedule(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const [studentcourse, setStudentCourse] = useState([]);
  const getStudentCourse = async () => {
    setIsLoading(true);
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
    setIsLoading(true);
    axios.get("http://localhost:3000/students", { withCredentials: "true" })
      .then((response) => {
        setStudent(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const [unit, setUnit] = useState([]);
  const getUnit = async () => {
    axios.get("http://localhost:3000/product-units", {withCredentials : 'true'})
      .then((response) => {
        setUnit(response.data);
      })
      .catch(error => {
        console.log(error.response)
    })
  };

  const filtt = (coba.filter(
    item => item.email === email)
  );

  const role = filtt.map((i) => i.role)
  const iduser = filtt.map((i) => i.id)

  const filttidstudent = (student.filter(
    item => item.user_id == iduser)
  );

  const idstudent = filttidstudent.map((i) => i.id)

  const filttidschedule = (studentcourse.filter(
    item => item.student_id == idstudent)
  );

  const idcourse = filttidschedule.map((i) => i.schedule_id)

  const filttidclass = (schedule.filter(({id}) => idcourse.includes(id))
  );

  const idproduct = filttidclass.map((i) => i.product_id)

  const productname = (data.filter(({id}) => idproduct.includes(id))
  );

  const productnameid = productname.map((i) => i.id)

  const productunit = (unit.filter(({product_id}) => productnameid.includes(product_id))
  );

  console.log(productunit);

  const Loading = () => {
    return (
      <div className="mx-auto">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  };
  const Courses = () =>{
      return (
        productname.map((course, index) => {
          return(
          <Link to={`/course-detail/${course.id}`} className="text-white">
            <Card.Text key={`course-${index}`}>
              <Card.Text style={{ marginBottom: '0' }}><b>{course.name}</b></Card.Text>
              <ProgressBar variant="danger" now={course.nilai} />
            </Card.Text>
          </Link>
          )
        })
      )
  }

  const Roles = () => {
    if (role == 'Student') {
      return (
        <Card className="text-center w-90 bg-card card-progress">
          <Card.Body>
            <Card.Title className="text-center">Your Progress in Course</Card.Title>
            {filttidschedule !== null ? 
            <Courses/> 
            : 
            <Card.Text style={{ marginBottom: '0' }}><b>Belum Mengikuti Course</b></Card.Text>
            }
          </Card.Body>
        </Card>
      )
    } else {
      return (
        <Card className="text-center w-90 bg-card card-progress">
          <Card.Body>
            <Card.Title className="text-center">Selamat datang,</Card.Title>
            <Card.Text className="h3">{filtt.map((i) => (i.full_name))}</Card.Text>
          </Card.Body>
        </Card>
      )
    }
  }

  const ShowProducts = () => {
    return (
      data.slice(2, 4).map((data, index) => (
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
      <Nav className="w-100 navbar sticky-top navbar-light d-block mb-4 top-tab-nav" role="navigationtop">
        <div className=" d-flex flex-row justify-content-between w-100">
          <NavItem>
            <img
              alt=""
              src={usericon}
              width="30"
              height="30"
              className="rounded-circle"
            />{''}
            <div className="user">

              <p className="h6">Hai, <span style={{ color: '#ED933D' }}>
                {filtt.map((i) => (i.full_name.substring(0, 6)))}

              </span></p>
            </div>
          </NavItem>
          {role == 'Student' ? 
            <NavItem className="d-flex" style={{ paddingTop: '5px' }}>
              <NavLink to="/note" className="top-nav-link" activeClassName="active">
                <FontAwesomeIcon size="2x" icon={faClipboard} />
              </NavLink>
            </NavItem>
          : 
            <span></span>
          }
          
        </div>
      </Nav>
      <div className="d-flex justify-content-center text-white">
        <Roles />
      </div>
      {role == "Student" ?
        <div className="d-flex justify-content-center text-white mb-3 mt-4 text-center">
          <Link to='/absent' className="btn-lg w-90 rounded-pill link-orange shadow">
            Koding Akademi Absent
          </Link>
        </div>
        :
        <span></span>
      }

      <div className="d-flex justify-content-center text-white mb-3 mt-3 text-center">
        <Link to='/report' className="btn-lg w-90 rounded-pill link-orange shadow">
          Report Student Activity
        </Link>
      </div>
      {role == "Student" ? 
      <span></span> 
      :  
      <div className="d-flex justify-content-center text-white mb-3 mt-3 text-center">
        <Link to='/note' className="btn-lg w-90 rounded-pill link-orange shadow">
          Notes
        </Link>
      </div>}
     
      <div className="justify-content-center m-3">
        <div class="mx-auto strike">
          {role == "Student" ? <span>Recommendation</span> : <span>Course Koding Akademi</span>}
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center mb-3">
        {isLoading === true ? <Loading /> : <ShowProducts />}
      </div>
      <div style={{ paddingBottom: '70px' }}>
      </div>
      <Navigation />
    </div>
  )
};

export default Home;
