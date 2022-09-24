import React, { useEffect, useState } from "react";
import "../App.css"
import Card from 'react-bootstrap/Card';
import { Nav, NavItem } from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCamera, faVideo } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

/* eslint eqeqeq: 0 */
const ReportEmployee = (props) => {
    const [data, setData] = useState([]);
    const [student, setStudent] = useState([]);
    const [user, setUser] = useState([]);
    const [unit, setUnit] = useState([]);
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
        getStudent();
        getUser();
        getUnit();
        getSchedule();
        getEmployee();
        getProduct();
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

    const getStudent = async () => {
        setIsLoading(true);
        axios.get("http://localhost:3000/students", { withCredentials: "true" })
            .then((response) => {
                setStudent(response.data);
                console.log(student);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.response);
            });
    };

    const getUser = async () => {
        setIsLoading(true);
        axios.get("http://localhost:3000/usersstudent", { withCredentials: 'true' })
            .then((response) => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.response);
            });
    };

    const getUnit = async () => {
        axios.get("http://localhost:3000/product-units/", { withCredentials: 'true' })
            .then((response) => {
                setUnit(response.data);
            })
            .catch(error => {
                console.log(error.response)
            })
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

    const [product, setProduct] = useState([]);
    const getProduct = async () => {
        setIsLoading(true);
        axios.get("http://localhost:3000/products", { withCredentials: "true" })
            .then((response) => {
                setProduct(response.data);
                console.log(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.response);
            });
    };

    const studentMap = student.map((i) => i.user_id)
    const userNew = (user.filter(({ id }) => studentMap.includes(id)));

    const filteremployee = (employee.filter(
        item => item.user_id == idstudent)
    );

    const idemployee = filteremployee.map((i) => i.id);

    const filterschedule = (schedule.filter(
        item => item.employee_id == idemployee)
    );

    const productcode = filterschedule.map((i) => i.product_id);

    const filterproduct = (product.filter(({ id }) => productcode.includes(id))
    );

    const filteredProduct = product.filter(
        item => item.id == productcode,
    );

    const tespro = product.filter(
        item => item.id == 2,
    );

    console.log(filteredProduct);
    console.log(product);
    console.log(filterschedule);

    const Loading = () => {
        return (
            <div className="mx-auto">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    };
    // https://6312108a19eb631f9d7f06f2.mockapi.io/student_report

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
            <div className="d-flex justify-content-center">
                <p className="font-weight-bold">Report Trainer for the course</p>
            </div>
            {/* {role == "Student" ? <ReportStudent /> : <ReportEmployee />} */}
            <Form className="form-report-employee">
                <div className="d-flex justify-content-center mt-3">
                    <p className="h3 text-white font-weight-bold">Student Report</p>
                </div>
                <div className="justify-content-center w-75 mx-auto">
                    <p className="has-text-centered"></p>
                    {/* {msg ? (
            <div className="alert alert-danger" role="alert">
                {msg}
            </div>)
            : (<></>)} */}
                    <Form.Select aria-label="Default select example" className="mb-3 form-control rounded-pill border border-warning text-center" required>
                        <option value="">Select Student ID</option>
                        {userNew.map((item) => (
                            <option value={item.id}>{item.id} - {item.full_name}</option>
                        ))}
                    </Form.Select>
                    <Form.Select aria-label="Default select example" className="mb-3 form-control rounded-pill border border-warning text-center" required>
                        <option value="">Select Schedule ID</option>
                        {filterschedule.map((item, index) => (
                            <option value={item.id}>{item.id} - {item.day} - {(product.filter(i => i.id == item.product_id)).map((i) => i.name)}</option>
                        ))}
                    </Form.Select>
                    <Form.Select aria-label="Default select example" className="mb-3 form-control rounded-pill border border-warning text-center" required>
                        <option value="">Select Unit ID</option>
                        {unit.map((item) => (
                            <option value={item.id}>{item.id} - {item.name}</option>
                        ))}
                    </Form.Select>
                    <Form.Group className="mb-3" controlId="formBasicphone">
                        <Form.Control className="form-control rounded-textarea border border-warning text-center" placeholder="Description" as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="number"
                            className="form-control rounded-pill border border-warning text-center" placeholder="Score" min="0" max="100" />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex flex-row justify-content-between custom-search" controlId="formBasicPassword">
                       
                        <Form.Control type="file" id="uploadimage" className="rounded-textarea" accept="image/*"/> 
                        <label id="Imglabel" for="uploadimage" className="my-auto">
                        <FontAwesomeIcon className="orange-icon custom-file-botton" size="2x" icon={faCamera} />
                        </label>

                    </Form.Group>
                    <Form.Group className="mb-3 d-flex flex-row justify-content-between custom-search" controlId="formBasicPassword">
                        <Form.Control type="file" id="uploadvideo" className="rounded-textarea" 
                        accept="video/*"/>
                        <label for="uploadimage" className="my-auto">
                        <FontAwesomeIcon className="orange-icon custom-file-botton" size="2x" icon={faVideo} />
                        </label>
                    </Form.Group>
                    <div className="d-flex flex-column justify-content-center">
                        <Button variant="primary" type="submit" className="btn btn-success shadow rounded-pill mb-3">
                            Save
                        </Button>
                    </div>
                </div>
            </Form> 
            <div style={{ paddingBottom: '40px' }}>
            </div>
        </div>
    )
};

export default ReportEmployee;
