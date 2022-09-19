import React, {useState}from 'react';
import logokodak from '../logo-kodak.svg';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const Forget = (props) => {
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
      <div className="justify-content-center mt-5">
      <img
              alt=""
              src={logokodak}
              width="150"
              height="150"
              className="rounded-circle mx-auto d-block logo"
            />{''}
            <p className="text-center h5 pt-3">Koding Akademi</p>
            <p className="text-center h3 bold">Forget Password</p>
      </div>
      <div className="mx-5 mt-3 justify-content-center">
          <p className="mb-0 text-start bold">Note :</p>
          <span>Masukan email Anda dan tunggu kode etik akan dikirimkan.</span>
      </div>
      <Form onSubmit={handleSubmit}>
      <div className="justify-content-center mt-5 w-75 mx-auto">
      <p className="has-text-centered"></p>
        {msg ? (
            <div className="alert alert-danger" role="alert">
                {msg}
            </div>)
            : (<></>)}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" className="form-control rounded-pill border border-warning text-center" placeholder="Enter your email" onChange={handleEmailChange} value={email}/>
        </Form.Group>
        <div className="d-flex flex-column justify-content-center mt-5">
        {/* <Button variant="primary" type="submit" className="btn btn-warning shadow rounded-pill mb-3">
          Send Code
        </Button> */}
        <Link to="/verification-code" className="btn btn-warning shadow rounded-pill mb-3">Send Code</Link>
        </div>
        </div>
      </Form>
      {/* <div className="justify-content-center mt-5 w-75 mx-auto">
        <div className="input-group mb-3">
          <input type="text" className="form-control rounded-pill border border-warning text-center" aria-label="email" placeholder="Enter your fullname"/>
        </div>
        <div className="input-group mb-3">
          <input type="email" className="form-control rounded-pill border border-warning text-center" aria-label="email" placeholder="Enter your email"/>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control rounded-pill border border-warning text-center" aria-label="password"
          placeholder="Enter your password"/>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control rounded-pill border border-warning text-center" aria-label="password"
          placeholder="confirm your password"/>
        </div>
        <div className="d-flex flex-column justify-content-center" id="">
          <button className="btn btn-warning shadow rounded-pill mb-3" type="button" onClick={() =>{history.push("/home");}}>Register</button>
        </div> */}
        <div className="d-flex flex-column justify-content-center ">
          <p className="text-center">Already have an account? <Link to="/" className="text-decoration-none">Sign In</Link></p>
        </div>
      </div>
  )
};

export default Forget;
