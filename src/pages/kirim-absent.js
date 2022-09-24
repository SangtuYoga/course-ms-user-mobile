import React, { useState } from "react";
import logokodak from '../logo-kodak.svg';
import Card from 'react-bootstrap/Card';
import { Nav } from 'reactstrap';
import { NavLink, useParams, Link, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
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
            <Card.Title className="text-center h-5">Selamat Belajar</Card.Title>
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
                    <p className="h3">Berhasil Absen</p>
                </div>
                <div  className="mx-4 d-flex justify-content-center">
                    <p className="text-muted">Anda masuk pukul</p>
                </div>
                <div className="text-center h3 fw-bold mb-5">
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
