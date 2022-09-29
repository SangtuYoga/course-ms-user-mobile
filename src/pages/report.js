import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem } from 'reactstrap';
// import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/* eslint eqeqeq: 0 */
const Report = (props) => {
  const [data, setData] = useState([]);
  const email = localStorage.getItem('email');
  const [coba, setCoba] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getReport = async () => {
      axios.get("https://6312108a19eb631f9d7f06f2.mockapi.io/student_report")
        .then((response) => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
    getReport();
    getNama();
    getReportData();
    getEmployee();
    getStudent();
    getUnit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getNama = async () => {
    axios.get("http://localhost:3000/usersstudent", { withCredentials: "true" })
      .then((response) => {
        setCoba(response.data);
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

  const [reportData, setReportData] = useState([]);
  const getReportData = async () => {
    axios.get("http://localhost:3000/report-teacher", {withCredentials : 'true'})
      .then((response) => {
        setReportData(response.data);
      })
      .catch(error => {
        console.log(error.response)
    })
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

  const [employee, setEmployee] = useState([]);
  const getEmployee = async () => {
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

  const iduser = filtt.map((i) => i.id)
  const role = filtt.map((i) => i.role)

  const filterdata = (data.filter(
    item => item.student_id == iduser)
  );

  const filteremp = (employee.filter(
    item => item.user_id == iduser)
  )

  const idemployee = filteremp.map((i) => i.id)

  const filterreport = (reportData.filter(
    item => item.employee_id == idemployee)
  );

  const sortfilterreport = filterreport.map(obj => {
    return {
      ...obj,
      date: new Date(obj.created_at),
      time: new Date(new Date(obj.created_at) * 1000).toLocaleTimeString(),
      dateonly: new Date(new Date(obj.created_at)).toLocaleString()
    }
  })
    .sort((a, b) => b.date - a.date)

  const length = ((filterdata.length / 11) * 100);

  console.log(idemployee);
  console.log(filterreport);
  console.log(sortfilterreport);
  console.log(unit);

  // const Loading = () => {
  //   return (
  //     <div className="mx-auto">
  //       <Spinner animation="border" variant="warning" />
  //     </div>
  //   );
  // };
  // https://6312108a19eb631f9d7f06f2.mockapi.io/student_report

  const ReportStudent = () => {
    const datas = [
      {
        name: 'Web Design HTML5, CSS, Javascript Beginner 1.0',
        Absent: 40,
        Progress: length,
        amt: 2400,
      },
      {
        name: 'PHP MYSQL PROGRAMMING',
        Absent: 30,
        Progress: 13,
        amt: 2210,
      }
      // ,
      // {
      //   name: 'Course C',
      //   Absent: 70,
      //   Progress: 70,
      //   amt: 2290,
      // },
      // {
      //   name: 'Course D',
      //   Absent: 27,
      //   Progress: 39,
      //   amt: 2000,
      // }
    ];

    const tickFormatter = (value: string, index: number) => {
      const limit = 20; // put your maximum character
      if (value.length < limit) return value;
      return `${value.substring(0, limit)}...`;
   };
    
    return (
      <>
        <div className="d-flex justify-content-center">
          <p className="font-weight-bold">Report Student for the course</p>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <Card className="w-90 align-content-center shadow rounded text-center report-card">
            <Card.Body>
              <Card.Title className="d-flex flex-column mb-0">
                <span>Student</span>
                <span>Report</span>
                <span>Course</span>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={datas}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis 
            height={60}
            dataKey="name" 
            style={{ fontSize: "10px"}}
            tickFormatter={tickFormatter}
            />
            <YAxis domain={[0, 100]} tickFormatter={(tick) => {
              return `${tick}%`;
            }} />
            <Tooltip formatter="name"/>
            <Legend />
            <Bar dataKey="Absent" fill="#8884d8" background={{ fill: "#eee" }} />
            <Bar dataKey="Progress" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </>
    );
  }

  const ReportEmployee = () => {
    return (
      <>
        <div className="d-flex justify-content-center">
          <p className="font-weight-bold">Report Trainer for the course</p>
        </div>
        <div className="d-flex justify-content-center mb-4">

          <Card className="w-90 align-content-center shadow rounded text-center report-card">
            <Link to="/report-employee" className="report-link">
              <Card.Body>
                <Card.Title className="d-flex flex-column mb-0">
                  <span>Trainer</span>
                  <span>Report</span>
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </div>
        <div>
          {sortfilterreport.map((data, index) => (
            <div className="d-flex justify-content-center mb-3">
            <Card className="note-card w-90 align-content-center shadow rounded-product" key={`data-${index}`}>
              <Card.Body>
                <Card.Title className="d-flex flex-column">
                    <span className="fs-12 my-auto d-flex justify-content-end text-white">
                    {data.dateonly}
                  </span>
                  <span className="fs-12 my-auto d-flex justify-content-end">To :&nbsp;
                      {(student.filter(item => item.id == data.student_id)).map((item) => item.name_student)}
                  </span>
                </Card.Title>
                <Card.Subtitle className="">
                <div className="d-flex flex-column">
                    <span className="h6 text-d">{(unit.filter(item => item.id == data.unit_id)).map((item) => item.name)}</span>
                    <span className="fs-12 text-d">Score :</span>
                  </div>
                </Card.Subtitle>
                <Card.Text>

                  <p className="text-dd" style={{ fontSize: "14px" }}>{data.description}</p>
                  {/* <span>Days Periode : {data.days_period} </span> */}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div>
      <Nav className="w-100 navbar sticky-top navbar-light d-block d-lg-none mb-4 top-tab-nav" role="navigationtop" style={{ paddingTop: '8px', height: '57px' }}>
        <div className=" d-flex flex-row justify-content-between w-100">
          <div className="d-flex">
            <NavItem>
              <NavLink to="" onClick={history.goBack} className="top-nav-link mb-3" activeClassName="active">
                <FontAwesomeIcon size="2x" icon={faArrowLeft} />
              </NavLink>
            </NavItem>
            <h5 className="user mb-3">Report Statistics</h5>
          </div>
        </div>
      </Nav>
      {role == "Student" ? <ReportStudent /> : <ReportEmployee />}

    </div>
  )
};

export default Report;
