import React, {useState}from 'react';
import logokodak from '../logo-kodak.svg';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = (props) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let item = { full_name, phone, email ,password, confPassword}
    console.warn(item);
    let result = await fetch("http://localhost:3000/users", {
      method: 'POST',
      body: JSON.stringify(item),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    if (result.status === 201) {
      history.push("/");
    }else{
      setMsg(true);
    }
  }

  return (
    <div className="container">
      <div className="justify-content-center mt-3">
      <img
              alt=""
              src={logokodak}
              width="150"
              height="150"
              className="rounded-circle mx-auto d-block logo"
            />{''}
            <p className="text-center h5 pt-3">Koding Akademi</p>
            <p className="text-center h6 text-muted">Welcome to the future</p>
      </div>
      <Form onSubmit={handleSubmit}>
      <div className="justify-content-center mt-5 w-75 mx-auto">
      <p className="has-text-centered"></p>
      {msg ? (
            <div className="alert alert-danger" role="alert">
                Register gagal, form masih belum terisi atau password dan confirm password tidak sama!
            </div>)
            : (<></>)}
      <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control type="text" className="form-control rounded-pill border border-warning text-center" placeholder="Enter your fullname" onChange={handleNameChange} value={full_name}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicphone">
          <Form.Control type="text" className="form-control rounded-pill border border-warning text-center" placeholder="Enter your phone number" onChange={handlePhoneChange} value={phone}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" className="form-control rounded-pill border border-warning text-center" placeholder="Enter your email" onChange={handleEmailChange} value={email}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" className="form-control rounded-pill border border-warning text-center" placeholder="Password" onChange={handlePasswordChange} value={password}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicconfPassword">
          <Form.Control type="password" className="form-control rounded-pill border border-warning text-center" placeholder="Confirm your Password" onChange={handleConfPasswordChange} value={confPassword}/>
        </Form.Group>
        <div className="d-flex flex-column justify-content-center">
        <Button variant="primary" type="submit" className="btn btn-warning shadow rounded-pill mb-3">
          Register
        </Button>
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

export default Register;
