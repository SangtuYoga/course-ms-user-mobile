import React from "react";
import logokodak from '../logo-kodak.svg';
import Card from 'react-bootstrap/Card';
import { Link, useLocation } from 'react-router-dom';
import Moment from 'react-moment';

const Send_Scan = () => {
  const location = useLocation();
  const state = location.state;
  const current = new Date();

  console.log(state);

  return (
    <div className="bg-absent">
      <div className="d-flex flex-row justify-content-center">
        <Card className=" w-90 align-content-center shadow h-80">
            <Card.Body>
            <Card.Title className="text-center h-5">Have a Good Study</Card.Title>
            <Card.Text>
                <div className="mx-auto d-flex justify-content-center mt-5">
                    <img
                    alt=""
                    src={logokodak}
                    width="100"
                    height="100"
                    className="rounded-circle d-block"
                    />
                </div>
                <div className="mx-4 d-flex justify-content-center mt-5">
                    <p className="h3">Success</p>
                </div>
                {/* <div  className="mx-4 d-flex justify-content-center">
                    <p className="text-muted">at</p>
                </div> */}
                <div className="text-center mb-5" style={{fontSize: "4.5rem", fontWeight: "600"}}>
                    <Moment format="hh:mm">
                            {current}
                    </Moment>
                </div>
            </Card.Text>
            <div className="d-flex justify-content-center text-white mb-3 mt-4 text-center">
              <Link to='/absent' className="btn-lg w-50 rounded-pill link-orange shadow">
                Kembali
              </Link>
            </div>
            </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Send_Scan;
