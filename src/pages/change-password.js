import React, {useState}from 'react';
import logokodak from '../logo-kodak.svg';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const ChangePassword = (props) => {
  let history = useHistory();
  const [full_name, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [msg, setMsg] = useState('');

  const handleNameChange = e => {
    setFullName(e.target.value)
  };
  const handlePhoneChange = e => {
    setPhone(e.target.value)
  };
  const handleEmailChange = e => {
    setEmail(e.target.value)
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  };
  const handleConfPasswordChange = e => {
    setConfPassword(e.target.value)
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let item = { full_name, phone, email ,password, confPassword, role}
  //   console.warn(item);
  //   let result = await fetch("http://localhost:3000/users", {
  //     method: 'POST',
  //     body: JSON.stringify(item),
  //     credentials: 'include',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     }
  //   });
  //   if (result.status === 201) {
  //     history.push("/");
  //   }else{
  //     setMsg(true);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users', {
      full_name: full_name,
      phone: phone,
      email: email,
      password: password,
      confPassword: confPassword,
      role: role
    }).then(() => {
      history.push("/");
    }).catch((error) => {
      console.log(error)
      setMsg(error.response.data.msg)
    });
  };

  return (
    <div className="container">
        <div className="justify-content-center h5 mt-3">
        <p className="text-center bold">Koding Akademi</p>
        </div>
      <div className="justify-content-center mt-5">
            <p className="text-center h3 bold">Set new password</p>
      </div>
      <div className="mx-5 mt-3 justify-content-center">
          <span>Enter your new password below and check the hint while setting it.</span>
      </div>
      <Form onSubmit={handleSubmit}>
      <div className="justify-content-center mt-5 w-75 mx-auto">
      <p className="has-text-centered"></p>
        {msg ? (
            <div className="alert alert-danger" role="alert">
                {msg}
            </div>)
            : (<></>)}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" className="form-control rounded-pill border border-warning text-center" placeholder="New Password" onChange={handlePasswordChange} value={password}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicconfPassword">
          <Form.Control type="password" className="form-control rounded-pill border border-warning text-center" placeholder="Confirm New Password" onChange={handleConfPasswordChange} value={confPassword}/>
        </Form.Group>
        <div className="d-flex flex-column justify-content-center mt-5">
        {/* <Button variant="primary" type="submit" className="btn btn-warning shadow rounded-pill mb-3">
          Send Code
        </Button> */}
        <Link to="/" className="btn btn-warning shadow rounded-pill mb-3">Submit</Link>
        </div>
        </div>
      </Form>
      </div>
  )
};

export default ChangePassword;
