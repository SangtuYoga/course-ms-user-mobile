import React, { useEffect, useState } from 'react';
import logokodak from '../logo-kodak.svg';
import Card from 'react-bootstrap/Card';
import { Nav } from 'reactstrap';
import { NavLink, useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Moment from 'react-moment';

const Absent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const email = localStorage.getItem('email');
  const current = new Date();

  useEffect(() => {

    const getProduct = async () => {
      setIsLoading(true);
      axios.get("http://localhost:3000/products", { withCredentials: "true" })
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
    getNama();
    getStudent();
    getSchedule();
    getStudentCourse();
    getProductCourse();
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
    axios.get("http://localhost:3000/schedules", { withCredentials: "true" })
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

  const [product, setProduct] = useState([])
  const getProductCourse = async () => {
    setIsLoading(true);
    axios.get("http://localhost:3000/productsDistinct", { withCredentials: "true" })
      .then((response) => {
        setProduct(response.data);
        console.log(data);
        setIsLoading(false);
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

  const idproduct = filttidclass.map((i) => i.product_id)

  const productname = (data.filter(({ id }) => idproduct.includes(id))
  );


  return (
    <div>
      <div className="title-orange">
        <Nav className="w-100 navbar sticky-top navbar-light d-block d-lg-none top-tab-nav-white nav-orange d-flex justify-content-between" role="navigationtop" style={{ paddingTop: '8px', height: '57px' }}>


          <NavLink to="/home" className="top-nav-link-white d-flex flex-row" activeClassName="active">
            <FontAwesomeIcon size="2x" icon={faArrowLeft} />
          </NavLink>
          <img
            alt=""
            src={logokodak}
            width="38"
            height="38"
            className="rounded-circle my-auto d-block"
            style={{ margin: "0px 30px 0px 0px" }}
          />
          <div></div>

          {/* <img
                alt=""
                src={logokodak}
                width="38"
                height="38"
                className="rounded-circle mx-auto d-block"
                /> */}

          {/* <img
                alt=""
                src={logokodak}
                width="38"
                height="38"
                className="rounded-circle mx-auto d-block"
                /> */}
        </Nav>
        <div className="text-center text-white">
          Koding Akademi
        </div>
        <div className="subtitle-absent">
          <div className="d-flex flex-row justify-content-center">
            <Card className=" w-90 align-content-center shadow rounded-product">
              <Card.Body>
                <Card.Text>
                  <div className="mx-4 d-flex flex-row justify-content-between">
                    <div className="my-auto">
                      <img
                        alt=""
                        src={logokodak}
                        width="50"
                        height="50"
                        className="rounded-circle my-auto d-block"
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <span className="rounded-pill btn btn-outline-primary btn-siswa">{filtt.map((i) => (i.role))}</span>
                      <span className="name-siswa">{filtt.map((i) => (i.full_name.substring(0, 6)))}</span>
                      <span className="date-siswa">
                        <Moment format="dddd, Do MMM YYYY">
                          {current}
                        </Moment>
                      </span>
                    </div>
                  </div>
                  <hr className="hr-absent" />
                  <div className="d-flex flex-column justify-content-between text-center font-1">
                    {
                      productname.map((course, index) => (
                        <div className="d-flex flex-row justify-content-between">
                          <div>
                            <span className="">{course.name.substring(0, 6)}</span>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="">Total Qouta</span>
                            <span>-</span>
                          </div>
                          <div className="d-flex flex-column">
                            <span>Course Quota Left</span>
                            <span>-</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <div className="container" style={{ height: "25vh" }}>
        <div className="">
          <div className="text-center h3 fw-bold mt-5 mb-5">
            <Moment format="hh:mm">
              {current}
            </Moment>
          </div>
          <div className="d-flex justify-content-center text-white mb-3 mt-4 text-center">
            <Link to='/scan-barcode' className="btn-lg w-50 rounded-pill link-orange shadow">
              Scan me
            </Link>
          </div>
          <div className="text-center">
            Silahkan scan barcode disini
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

export default Absent;