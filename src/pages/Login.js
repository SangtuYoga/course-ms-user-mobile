import React, { useState } from 'react';
import logokodak from '../logo-kodak.svg';
import { useHistory, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login () {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    //login
    const handleEmailChange = e => {
        setEmail(e.target.value)
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        let result = await fetch("http://localhost:3000/loginstudent", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (result.status === 200) {
            history.push({
              pathname: '/home',
              // state: { email: email }
        });   
          localStorage.setItem('email', email);
        } else {
            setMsg(true);
        }
    }

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
            <p className="text-center h6 text-muted">Welcome to the future</p>
      </div>
      <div className="justify-content-center mt-5 w-75 mx-auto">
      <Form onSubmit={handleSubmit}>
        <p className="has-text-centered"></p>
        {msg ? (
            <div className="alert alert-danger" role="alert">
                Login gagal, email atau password salah
            </div>)
            : (<></>)}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" className="form-control rounded-pill border border-warning text-center" placeholder="Enter email" onChange={handleEmailChange} value={email}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" className="form-control rounded-pill border border-warning text-center" placeholder="Password" onChange={handlePasswordChange} value={password}/>
        </Form.Group>
        <div className="d-flex flex-column justify-content-center">
        <Button variant="primary" type="submit" className="btn btn-warning shadow rounded-pill mb-3">
          Login
        </Button>
        </div>
      </Form>
        {/* <div className="input-group mb-3">
          <input type="email" className="form-control rounded-pill border border-warning text-center" aria-label="email" placeholder="Email"/>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control rounded-pill border border-warning text-center" aria-label="password"
          placeholder="Password"/>
        </div>
        <div className="d-flex flex-column justify-content-center" id="">
          <button className="btn btn-warning shadow rounded-pill mb-3" type="button" onClick={() =>{history.push("/home");}}>Login</button>
          <button className="btn btn-warning shadow rounded-pill mb-4" type="button">Sign in with Google</button>
        </div> */}
        <div className="d-flex flex-column justify-content-center">
        <Link to="/" className="btn btn-warning shadow rounded-pill mb-3">
          Sign in with Google
        </Link>
        </div>
        
        <div className="d-flex flex-column justify-content-center ">
          <Link to="/register" className="text-decoration-none  text-center">Having trouble logging in?</Link>
          <hr className="bg-danger border-2 border-top border-danger w-50 mx-auto"></hr>
          <Link to="/register" className="text-decoration-none  text-center">Sign Up</Link> 
        </div>
      </div>
      
    </div>
  )
};

export default Login;
