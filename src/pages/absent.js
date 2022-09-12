import React , { useEffect, useState } from 'react';
import logokodak from '../logo-kodak.svg';
import Card from 'react-bootstrap/Card';
import { Nav, NavItem} from 'reactstrap';
import { NavLink, useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUp, faCheck, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Moment from 'react-moment';

const Absent = () => {
  
  const { id } = useParams();
 
  const [showResults, setShowResults] = React.useState(true)
  // const [showResults2, setShowResults2] = React.useState(false)

  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const length = data.length;

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  useEffect(() => {
    const getProductbyId = async () => {
      axios.get("http://localhost:3000/products/" + id,  {withCredentials : "true"})
        .then((response) => {
          setProduct(response.data);
        })
        .catch(error => {
          console.log(error.response)
      });
    };
    getProductbyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getProductby = async () => {
      axios.get("http://localhost:3000/product-unitsbyProductid/"+ id, {withCredentials : 'true'})
        .then((response) => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error.response)
      })
    };
    getProductby();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const total = data.reduce((acc, row) => acc + data.amount, 0);
    setTotalSum(total)
  }, [data]);

  const Results = () => {
    return (
      data.map((data, index)=>(
        <ul className="list-group mb-3">
          <li className="list-group-item list-account">
          <Link className="d-flex justify-content-between account-menu">
            <span>{data.name}</span>
            <FontAwesomeIcon size="lg" icon={faCheck}/>
          </Link>
          </li>
        </ul>
      ))
    );
    };
    

    return (
        <div>
        <div className="title-orange">
        <Nav className="w-100 navbar sticky-top navbar-light d-block d-lg-none top-tab-nav-white nav-orange d-flex justify-content-between" role="navigationtop" style={{ paddingTop: '8px', height: '57px'}}>
       
          
            <NavLink to="/home" className="top-nav-link-white d-flex flex-row" activeClassName="active">
              <FontAwesomeIcon size="2x" icon={faArrowLeft}/>
            </NavLink>
            <img
                alt=""
                src={logokodak}
                width="38"
                height="38"
                className="rounded-circle my-auto d-block"
                style={{margin: "0px 30px 0px 0px"}}
                />
                <div></div>

          {/* <img
                alt=""
                src={logokodak}
                width="38"
                height="38"
                className="rounded-circle mx-auto d-block"
                /> */}
            
            {/* <img
                alt=""
                src={logokodak}
                width="38"
                height="38"
                className="rounded-circle mx-auto d-block"
                /> */}
      </Nav>
      <div className="text-center text-white">
      Koding Akademi
      </div>
      <div className="subtitle-absent">
       <div className="d-flex flex-row justify-content-center">
        <Card className=" w-90 align-content-center shadow rounded-product">
            <Card.Body>
            <Card.Text>
            <div  className="mx-4 d-flex flex-row justify-content-between">
            <div className="my-auto">
                <img
                alt=""
                src={logokodak}
                width="50"
                height="50"
                className="rounded-circle my-auto d-block"
                />
            </div>
            <div className="d-flex flex-column">
              <span className="rounded-pill btn btn-outline-primary btn-siswa">Siswa</span>
              <span className="name-siswa">Wahyu Wastuguna</span>
              <span className="date-siswa">
                <Moment format="dddd, Do MMM YYYY">
                    {current}
                </Moment>
              </span>
            </div>
            </div>
            <hr className="hr-absent"/>
            <div className="d-flex flex-row justify-content-between text-center font-1">
                <div className="d-flex flex-column">
                    <span className="">Jumlah</span>
                    <span>-</span>
                </div>
                <div className="d-flex flex-column">
                    <span>Sakit</span>
                    <span>-</span>
                </div>
                <div className="d-flex flex-column">
                    <span>Ijin</span>
                    <span>-</span>
                </div>
                <div className="d-flex flex-column">
                    <span>Sisa</span>
                    <span>-</span>
                </div>
            </div>
          </Card.Text>
            </Card.Body>
        </Card>
       </div>
      </div>
      </div>
      <div className="container" style={{height:"25vh"}}>
          <p className="text-muted my-2 text-center">Course Content</p>
          <div className="mt-4">
          <Link onClick={()=>setShowResults(!showResults)} className="d-flex justify-content-between account-menu">
            <span className="h5" style={{ color : '#ED933D' }}>Course Progress</span>
            
            { showResults ? <FontAwesomeIcon className="orange-icon" size="lg" icon={faArrowUp}/> : <FontAwesomeIcon className="orange-icon" size="lg" icon={faArrowDown}/> }
          </Link>
            <div className="pb-3">
            { showResults && <Results/> }
            </div>
          </div>
          {/* <div className="mt-4">
          <Link onClick={()=>setShowResults2(!showResults2)} className="d-flex justify-content-between account-menu">
            <span>Section 2 : Course Progress</span>
            { showResults2 ? <FontAwesomeIcon size="lg" icon={faArrowUp}/> : <FontAwesomeIcon size="lg" icon={faArrowDown}/> }
          </Link>
            <div>
            { showResults2 && <Results/> }
            </div>
          </div> */}
      </div>
      </div>
  )
  
};

export default Absent;