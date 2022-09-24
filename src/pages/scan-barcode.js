import React, { useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { Nav } from 'reactstrap';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const Scan = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  let history = useHistory();


  const onUpdateScreen = (err, result) => {
    if (result) {
      setData(result.text);
      history.push({
        pathname: '/send-scan',
          state: data // your data array of objects
      })
      console.log(result);
      setShow(false);
    } else {
      setData("Not Found");
    }
  };

  return (
    <div>
      <div className="title-orange">
        <Nav className="w-100 navbar sticky-top navbar-light d-block d-lg-none top-tab-nav-white nav-orange d-flex justify-content-between" role="navigationtop" style={{ paddingTop: '8px', height: '57px'}}>
       
          
            <NavLink to="" onClick={history.goBack} className="top-nav-link-white d-flex flex-row" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faArrowLeft}/>
            </NavLink>
                <div></div>
        </Nav>
      </div>
      <div>
        <div className="text-center h3 fw-bold mt-5 mb-5">
          Move camera to barcode
        </div>
        <BarcodeScannerComponent
          width="100%"
          height="100%"
          cameraStyle={[{height:700}]}
          onUpdate={(err, result) => onUpdateScreen(err, result)}
        />
        <p className="text-center">{data}</p>
      </div>
        <div className="d-flex justify-content-center text-white mb-3 mt-4 text-center">
        <Button to='/send-scan' className="btn-lg w-50 rounded-pill link-orange shadow">
          Kirim
        </Button>
      </div>
    </div>
  );
}

export default Scan;
