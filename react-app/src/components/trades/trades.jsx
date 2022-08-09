import React, { useState, useEffect } from "react";
import { findTrades} from "../../services/TradeServices";
import { getTradeByID } from "../../services/getTradeByID";

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
import { Routes,BrowserRouter,Route } from 'react-router-dom';

//http://localhost:8080/api/v2/trades/${trade.id}/${trade.bid}/${trade.sid}/${trade.cid}/${trade.quantity}/${trade.status}/${trade.price}/${trade.buysell}/${trade.tradedate}/${trade.settlementdate}
export const Trades = () => {
    const [trades, setTrades] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
    findTrades()
            .then(({data}) => {
            setTrades(data)
            ;
            });
    }, []);

    function addTrade(){
      const trade={
        "id": 0,
        "bid": document.getElementById("bid").value,
        "cid": document.getElementById("cid").value,
        "sid": document.getElementById("sid").value,
        "quantity": document.getElementById("quantity").value,
        "price": document.getElementById("price").value,
        "buysell": document.getElementById("buysell").value,
        "tradedate": document.getElementById("tradedate").value,
        "settlementdate": document.getElementById("settlementdate").value,
        "status": document.getElementById("status").value
      };
      axios.post(`https://20220809t103911-dot-db-grads-7dhn-group-26.nw.r.appspot.com/api/v2/trades/${trade.id}/${trade.bid}/${trade.sid}/${trade.cid}/${trade.quantity}/${trade.status}/${trade.price}/${trade.buysell}/${trade.tradedate}/${trade.settlementdate}`)
      .then(window.location.reload(false));
    }

    function gettingTradeByID(){
      const id = document.getElementById("id");
      console.log(id.value);
      getTradeByID(id.value)
              .then(({data}) => {
              setTrades(data);
              });
    }
    
    const token=localStorage.getItem("token")

           
    
    if(token!=null){
  return (
    <>
        
        <Container style={{ padding: '2rem 1rem 1rem 1rem' }}>
          <h1>Trades</h1>
        <div>
        
          <Row>
            <Col>
        <Card border="light" style={{ width: '18rem' }}>
          <Card.Header>Get trades by ID</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="getTradeByID">
                {/* <Form.Label></Form.Label> */}
                <Form.Control type="number" placeholder="Enter trade ID" id="id"/>
              </Form.Group>
              <Button variant="primary" onClick={gettingTradeByID}>
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
          <Button variant="primary" onClick={handleShow}>
          Create a new trade
        </Button>
          </Col>

          
        </Row>
        

        
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create trades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>ISIN</Form.Label> */}
            <Form.Control type="number" placeholder="Enter BID" id="bid"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>CUSIP</Form.Label> */}
            <Form.Control type="number" placeholder="Enter SID" id="sid"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>CUSIP</Form.Label> */}
            <Form.Control type="number" placeholder="Enter CID" id="cid"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="number" placeholder="Enter quantity" id="quantity" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="text" placeholder="Enter status" id="status" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="number" placeholder="Enter price" id="price" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="text" placeholder="Enter buysell" id="buysell" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="date" placeholder="Enter trade date" id="tradedate"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label></Form.Label> */}
            <Form.Control type="date" placeholder="Enter settlement date" id="settlementdate"/>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addTrade}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        <div>

          <div>
            <Table striped bordered hover variant="dark" style={{marginTop:"20px"}}>
            
              <thead>
              <tr>
                
                <th>ID</th>
                <th>BOOK NAME</th>
                <th>COUNTERPARTY NAME</th>
                <th>STATUS</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TRADE DATE</th>
                <th>SETTLEMENT DATE</th>
                
              </tr>
            </thead>
            
            <tbody>
            { trades.map(trade => 
              <tr>
                <td>{trade.id}</td>
                <td>{trade.book.bookname}</td>
                <td>{trade.counterparty.name}</td>
                <td>{trade.status}</td>
                <td>{trade.price}</td>
                <td>{trade.quantity}</td>
                <td>{new Date(trade.tradedate).toLocaleDateString()}</td>
                <td>{new Date(trade.settlementdate).toLocaleDateString()}</td>
                
                
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
  return window.location.href = "/";
}

};
