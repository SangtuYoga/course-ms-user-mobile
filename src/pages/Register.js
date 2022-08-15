import React from 'react';
import { useHistory, Link } from 'react-router-dom';

const Register = (props) => {
  let history = useHistory();

  return (
    <div className="container">
      <div className="justify-content-center mt-5">
      <img
              alt=""
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              width="150"
              height="150"
              className="rounded-circle mx-auto d-block"
            />{''}
            <p className="text-center h5 pt-3">Koding Akademi</p>
            <p className="text-center h6 text-muted">Welcome to the future</p>
      </div>
      <div className="justify-content-center mt-5 w-75 mx-auto">
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
        </div>
        <div className="d-flex flex-column justify-content-center ">
          <p className="text-center">Already have an account? <Link to="/" className="text-decoration-none">Sign In</Link></p>
        </div>
      </div>
      
    </div>
  )
};

export default Register;
