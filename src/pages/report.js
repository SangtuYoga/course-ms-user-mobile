import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem } from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/* eslint eqeqeq: 0 */
const Report = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const email = localStorage.getItem('email');
  const [coba, setCoba] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getReport = async () => {
      setIsLoading(true);
      axios.get("https://6312108a19eb631f9d7f06f2.mockapi.io/student_report")
        .then((response) => {
          setData(response.data);
          console.log(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error.response);
        });
    };
    getReport();
    getNama();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const filtt = (coba.filter(
    item => item.email === email)
  );

  const idstudent = filtt.map((i) => i.id)
  const role = filtt.map((i) => i.role)

  const filterdata = (data.filter(
    item => item.student_id == idstudent)
  );

  const length = ((filterdata.length / 11) * 100);

  const maping = filterdata.map((item) => item)

  console.log(filterdata);
  console.log(data);
  console.log(length);
  console.log(role);

  const schedule = [{
    id: 1,
    name: 'Website HTML',
    start_time: '13:00',
    end_time: '15:00',
    day_name: 'Mon',
    day: '05',
    month: '09',
    year: '2022'
  },
  {
    id: 2,
    name: 'Arduino',
    start_time: '15:00',
    end_time: '16:00',
    day_name: 'Tues',
    day: '06',
    month: '09',
    year: '2022'
  },
  {
    id: 3,
    name: 'Basis Data',
    start_time: '15:00',
    end_time: '16:00',
    day_name: 'Wed',
    day: '07',
    month: '09',
    year: '2022'
  },
  {
    id: 4,
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
        <Spinner animation="border" variant="warning" />
      </div>
    );
  };
  // https://6312108a19eb631f9d7f06f2.mockapi.io/student_report




  const ReportStudent = () => {
    const datas = [
      {
        name: 'Course A',
        Absent: 40,
        Progress: length,
        amt: 2400,
      },
      {
        name: 'Course B',
        Absent: 30,
        Progress: 13,
        amt: 2210,
      },
      {
        name: 'Course C',
        Absent: 70,
        Progress: 70,
        amt: 2290,
      },
      {
        name: 'Course D',
        Absent: 27,
        Progress: 39,
        amt: 2000,
      }
    ];
    
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
          <BarChart
            width={350}
            height={300}
            data={datas}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{ fontSize: "10px" }} />
            <YAxis domain={[0, 100]} tickFormatter={(tick) => {
              return `${tick}%`;
            }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Absent" fill="#8884d8" background={{ fill: "#eee" }} />
            <Bar dataKey="Progress" fill="#82ca9d" />
          </BarChart>
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
