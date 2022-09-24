import React, { useEffect, useState } from "react";
import "../App.css";
import { Nav, NavItem } from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const CreateNote = () => {
    let history = useHistory();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const email = localStorage.getItem('email');

    const [id, setId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [roleStd, setRoleStd] = useState('Student');
    const [roleEmp, setRoleEmp] = useState('Employee');

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

    const addNoteStd = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/notes", {
            student_id: idstudent,
            employee_id: employeeId,
            title: title,
            description: description,
            role: roleStd,
        }, { withCredentials: 'true' })
            .then(() => {
                history.push("/note");
            }).catch((error) => {
                console.log(error)
            });
    };

    const addNoteEmp = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/notes", {
            student_id: studentId,
            employee_id: idemployee,
            title: title,
            description: description,
            role: roleEmp,
        }, { withCredentials: 'true' })
            .then(() => {
                history.push("/note");
            }).catch((error) => {
                console.log(error)
            });
    };

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

    const filterestd = (student.filter(
        item => item.user_id == iduser)
    )

    const idstudent = filterestd.map((i) => i.id)

    const filterdatastd = (data.filter(
        item => item.student_id == idstudent)
    );

    const filteremp = (employee.filter(
        item => item.user_id == iduser)
    )

    const idemployee = filteremp.map((i) => i.id)

    const sortfilterdatastd = filterdatastd.slice().sort((a, b) => b.date - a.date)

    const employeeMap = employee.map((i) => i.user_id)
    const empMap = (employee.filter(({ user_id }) => employeeMap.includes(user_id))
    );
    const studentMap = student.map((i) => i.user_id)
    const stdMap = (student.filter(({ user_id }) => studentMap.includes(user_id))
    );

    console.log(idstudent);

    const Loading = () => {
        return (
            <div className="mx-auto">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    };

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
                        <h5 className="user mb-3">Create Note</h5>
                    </div>
                </div>
            </Nav>
            <div>
                {/* <div className="d-flex justify-content-center">
                    <p className="font-weight-bold">Create Note</p>
                </div> */}
                {/* {role == "Student" ? <ReportStudent /> : <ReportEmployee />} */}
                {role == "Student" ?
                    <Form onSubmit={addNoteStd} className="form-report-employee">
                        <div className="d-flex justify-content-center mt-3">
                            <p className="h3 text-white font-weight-bold">Note for Trainer</p>
                        </div>
                        <div className="justify-content-center w-75 mx-auto">
                            <p className="has-text-centered"></p>
                            {/* {msg ? (
                        <div className="alert alert-danger" role="alert">
                            {msg}
                        </div>)
                        : (<></>)} */}
                            <Form.Group className="mb-3" controlId="formBasicphone">
                                <Form.Control type="text"
                                disabled className="d-none form-control rounded-textarea border border-warning text-center" value={idstudent} onChange={(e) => setStudentId(e.target.value)} />
                            </Form.Group>
                            <Form.Select aria-label="Default select example" className="mb-3 form-control rounded-pill border border-warning text-center" onChange={(e) => setEmployeeId(e.target.value)} required>
                                <option value="">Select Employee</option>
                                {empMap.map((item) => (
                                    <option value={item.id}>{item.name_employee}</option>
                                ))}
                            </Form.Select>
                            <Form.Group className="mb-3" controlId="formBasicphone">
                                <Form.Control className="form-control rounded-textarea border border-warning text-center" placeholder="Title" as="textarea" rows={2} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicphone">
                                <Form.Control className="form-control rounded-textarea border border-warning text-center" placeholder="Description" as="textarea" rows={4} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <div className="d-flex flex-column justify-content-center">
                                <Button variant="primary" type="submit" className="btn btn-success shadow rounded-pill mb-3">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Form>
                    :
                    <Form onSubmit={addNoteEmp} className="form-report-employee">
                        <div className="d-flex justify-content-center mt-3">
                            <p className="h3 text-white font-weight-bold">Note for Student</p>
                        </div>
                        <div className="justify-content-center w-75 mx-auto">
                            <p className="has-text-centered"></p>
                            {/* {msg ? (
                            <div className="alert alert-danger" role="alert">
                                {msg}
                            </div>)
                            : (<></>)} */}
                            <Form.Group className="mb-3" controlId="formBasicphone">
                                <Form.Control type="text" className="d-none form-control rounded-textarea border border-warning text-center" value={idemployee} onChange={(e) => setEmployeeId(e.target.value)} />
                            </Form.Group>
                            <Form.Select aria-label="Default select example" className="mb-3 form-control rounded-pill border border-warning text-center" onChange={(e) => setStudentId(e.target.value)} required>
                                <option value="">Select Student</option>
                                {stdMap.map((item) => (
                                    <option value={item.id}>{item.name_student}</option>
                                ))}
                            </Form.Select>
                            <Form.Group className="mb-3" controlId="formBasicphone">
                                <Form.Control className="form-control rounded-textarea border border-warning text-center" placeholder="Title" as="textarea" rows={2} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicphone">
                                <Form.Control className="form-control rounded-textarea border border-warning text-center" placeholder="Description" as="textarea" rows={4} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <div className="d-flex flex-column justify-content-center">
                                <Button variant="primary" type="submit" className="btn btn-success shadow rounded-pill mb-3">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Form>
                }

            </div>
        </div>
    )
};

export default CreateNote;
