import React, { useState, useEffect } from "react";
import { findPets } from "../../services/PetServices";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaEdit,FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import styles from "./Pets.module.scss";


export const Pets = () => {
    const [pets, setPets] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
    findPets()
            .then(({data}) => {
            setPets(data);
            });
    }, []);
  
    

  return (
    <>
         <Container style={{ padding: '2rem 1rem 1rem 1rem' }}>
        <div>
        
          <Row>
            <Col>
        <Card border="light" style={{ width: '18rem' }}>
          <Card.Header>Get securities by ID</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="getSecuritiesByID">
                {/* <Form.Label></Form.Label> */}
                <Form.Control type="number" placeholder="Enter security ID" />
              </Form.Group>
              <Button variant="primary" type="submit">
                  Submit
                </Button>
              
              
            </Form>
          </Card.Body>
        </Card>
        </Col>

        <Col>
        <Card border="light" style={{ width: '18rem' }}>
          <Card.Header>Get securities for a user</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="getSecuritiesByUserID">
                {/* <Form.Label></Form.Label> */}
                <Form.Control type="number" placeholder="Enter user ID" />
              </Form.Group>
              
              <Button variant="primary" type="submit">
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
                <Form.Control type="number" placeholder="Enter security ID" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        </Col>
        </Row>
        
        
        </div>

        <Card border="light" style={{ width: '18rem' }}>
          <Card.Header>Get securities by maturity date range</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3" controlId="getSecuritiesByDateRange">
              <Form.Label>Start date</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>End date</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card.Body>
        </Card>
        
        <Button variant="primary" onClick={handleShow}>
          Create a new security
        </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create security</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>ID</Form.Label> */}
            <Form.Control type="number" placeholder="Enter ID"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>ISIN</Form.Label> */}
            <Form.Control type="number" placeholder="Enter ISIN" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>CUSIP</Form.Label> */}
            <Form.Control type="number" placeholder="Enter CUSIP" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Issuer name</Form.Label> */}
            <Form.Control type="text" placeholder="Enter issuer name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Maturity date</Form.Label>
            <Form.Control type="date" placeholder="Enter maturity date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="number" placeholder="Enter coupon number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="text" placeholder="Enter type" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="number" placeholder="Enter face value" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="number" placeholder="Enter status" />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        <div>

          <div>
            <Table striped bordered hover variant="dark">
            
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
                <td>{pet.maturitydate.slice(0,10)}</td>
                <td>{pet.coupon}</td>
                <td>{pet.type}</td>
                <td>{pet.facevalue}</td>
                <td>{pet.status}</td>
                <td><FaEdit /></td>
                <td>
                  <Button variant="primary" type="submit" onClick={remove}>
                    Delete
                  </Button>
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
};
