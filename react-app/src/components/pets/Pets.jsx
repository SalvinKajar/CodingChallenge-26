import React, { useState, useEffect } from "react";
import { findPets} from "../../services/PetServices";
import { getMaturedSecurities} from "../../services/getMaturedSecurities";
import { getSecuritiesByID} from "../../services/getSecuritiesByID";
import { betweenDates } from "../../services/BetweenDates";
import { getWatchlist } from "../../services/getWatchlist";
import {getTradesBySecurity} from "../../services/getTradesBySecurity";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaEdit,FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { Navigate } from 'react-router-dom';
import styles from "./Pets.module.scss";


export const Pets = () => {
    const [pets, setPets] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleCloseEdit = () => setShow(false);
    // const handleShowEdit = () => setShow(true);

    useEffect(() => {
    findPets()
            .then(({data}) => {
            setPets(data);
            });
    }, []);
  
    
    function gettingMaturedSecurities(){
      
        getMaturedSecurities()
                .then(({data}) => {
                setPets(data);
                });
       
    }

    function gettingSecuritiesByID(){
      const id = document.getElementById("id");
      console.log(id.value);
      getSecuritiesByID(id.value)
              .then(({data}) => {
              setPets(data);
              });
     
  }

  function sendSecurity(){
    const security={
      "id": 0,
      "isin": document.getElementById("isin").value,
      "cusip": document.getElementById("cusip").value,
      "issuer": document.getElementById("issuer").value,
      "maturitydate": document.getElementById("maturitydate").value,
      "coupon": document.getElementById("coupon").value,
      "type": document.getElementById("type").value,
      "facevalue": document.getElementById("facevalue").value,
      "status": document.getElementById("status").value
    };
    axios.post('http://localhost:8080/api/v2/securities', security)
    .then(window.location.reload(false));
  }

  function getbetweendates(){

    const d1=document.getElementById("startdate");
    const d2=document.getElementById("enddate");
    console.log(d1.value);


    betweenDates(d1.value,d2.value)
          .then(({data}) => {
          setPets(data);
          });
  }

  function deleteSecurity(id1) {
    console.log("working "+id1);
    axios.get(`http://localhost:8080/api/v2/deletesecurities/${id1}`)
      .then(window.location.reload(false));
  }

  function addToWatchlist(){
    const security = {"id":document.getElementById("watchlist").value};
    console.log(security);
    axios.get(`http://localhost:8080/api/v2/addtowatchlist/${security.id}`)
    .then(window.location.reload(false));
  }

  function gettingWatchlist() {
    getWatchlist()
    .then(({data}) => {
      setPets(data);
      });
  }

  function editChanges(){
    console.log("edit");
  }

  function getTradesForSecurity() {
    const security = {"id":document.getElementById("tradeSecurityID").value}
    getTradesBySecurity(security.id)
    .then(({data}) => {
      setPets(data);
      });
  }

  const token=localStorage.getItem("token")

           
    
  if(token!=null){
    

return (
    <>
    
         <Container style={{ padding: '2rem 1rem 1rem 1rem' }}>
         <h1>Securities</h1>
        <div>
        
          <Row>
            <Col>
        <Card border="light" style={{ width: '18rem' }}>
          <Card.Header>Get securities by ID</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="getSecuritiesByID">
                {/* <Form.Label></Form.Label> */}
                <Form.Control type="number" placeholder="Enter security ID" id="id"/>
              </Form.Group>
              <Button variant="primary" onClick={gettingSecuritiesByID}>
                Submit
              </Button>
              
              
            </Form>
          </Card.Body>
        </Card>
        </Col>

      

        <Col>
        <Card border="light" style={{ width: '18rem' }}>
          <Card.Header>Get all trades for a security</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="getSecuritiesByTrade">
                {/* <Form.Label></Form.Label> */}
                <Form.Control type="number" placeholder="Enter security ID" id="tradeSecurityID" />
              </Form.Group>
              <Button variant="primary" onClick={getTradesForSecurity}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        </Col>
        </Row>
        
        
        </div>

        <Row>
          <Col>
            <Card border="light" style={{ width: '18rem' }}>
            <Card.Header>Get securities by maturity date range</Card.Header>
            <Card.Body>
              <Form.Group className="mb-3" controlId="getSecuritiesByDateRange">
                <Form.Label>Start date</Form.Label>
                <Form.Control type="date" placeholder="" id="startdate"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>End date</Form.Label>
                <Form.Control type="date" placeholder="" id="enddate"/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={getbetweendates}>
                Submit
              </Button>
            </Card.Body>
          </Card>
          </Col>

          <Col>
            <Card border="light" style={{ width: '18rem' }}>
            <Card.Header>Watchlist</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="addToWatchlist">
                  {/* <Form.Label></Form.Label> */}
                  <Form.Control type="number" placeholder="Enter security ID" id="watchlist" />
                </Form.Group>
                <Button variant="primary" onClick={addToWatchlist}>
                  Add
                </Button>
              </Form>
            </Card.Body>
          </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
        <Button variant="primary" onClick={handleShow}>
          Create a new security
        </Button>
        </Col>

        <Col>
        <Button variant="primary" type="submit" onClick={gettingMaturedSecurities}>
          Matured securities
        </Button>
        </Col>

        <Col>
        <Button variant="primary" type="submit" onClick={gettingWatchlist}>
          Get watchlist
        </Button>
        </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create security</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>ISIN</Form.Label> */}
            <Form.Control type="number" placeholder="Enter ISIN" id="isin"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>CUSIP</Form.Label> */}
            <Form.Control type="number" placeholder="Enter CUSIP" id="cusip"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Issuer name</Form.Label> */}
            <Form.Control type="text" placeholder="Enter issuer name" id="issuer"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Maturity date</Form.Label>
            <Form.Control type="date" placeholder="Enter maturity date" id="maturitydate"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="number" placeholder="Enter coupon number" id="coupon" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="text" placeholder="Enter type" id="type" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="number" placeholder="Enter face value" id="facevalue" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="text" placeholder="Enter status" id="status"/>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendSecurity}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        <div>

          <div>
            <Table striped bordered hover variant="dark"  style={{marginTop:"20px"}}>
            
              <thead>
              <tr>
                
                <th>ID</th>
                <th>ISIN</th>
                <th>CUSIP</th>
                <th>ISSUER</th>
                <th>MATURITY</th>
                <th>COUPON</th>
                <th>TYPE</th>
                <th>FACEVALUE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            
            <tbody>
            { pets.map(pet => 
              <tr>
                <td>{pet.id}</td>
                <td>{pet.isin}</td>
                <td>{pet.cusip}</td>
                <td>{pet.issuer}</td>
                <td>{new Date(pet.maturitydate).toLocaleDateString()}</td>
                <td>{pet.coupon}</td>
                <td>{pet.type}</td>
                <td>{pet.facevalue}</td>
                <td>{pet.status}</td>
                <td>
                  <Button variant="primary" onClick={() => deleteSecurity(pet.id)}>Delete</Button>
                </td>

                
              </tr>
            )}
            </tbody>
            
            </Table>
             
          </div>
        </div>
       
        </Container>
    </>
  
  )
}
else{
  return <Navigate to="/"/>
}
};
