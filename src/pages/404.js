import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = (props) => {
    const {pathname} = useLocation()

  return (
    <div style={{backgroundColor: '#111', height: '100vh', paddingTop: '75%'}}>
        <div className="text-center mx-auto h4 text-white">
            <p>Page {pathname} not Found</p>
            <Link to="/">Home</Link>
        </div>

    </div>
    
  )
};

export default NotFound;