import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
    // const {pathname} = useLocation()

  return (
    <div className="page-404" style={{backgroundColor: 'rgb(0,0,0)', height: '100vh', paddingTop: '45%'}}>
        <div className="text-center mx-auto h4 text-white">
            <p style={{fontSize: "120px", fontWeight: '700'}}>404</p>
            <p className="text-shadow">We couldn't find this page.</p>
            <span>The link you followed may be broken, or the page may have been removed.&nbsp;<Link to="/home" className="text-orange">Go back to <u>homepage.</u></Link></span>
        </div>

    </div>
    
  )
};

export default NotFound;