import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Pets } from "../../components/pets/Pets";
import { Trades } from "../../components/trades/trades";
import { SearchBox } from "../../components/pets/SearchBox";
import { LoginPage } from "./Login";
import { Router, Route, Switch, Link } from 'react-router-dom';

export const MyNavbar = () => {


    return (
      <>
      <Container>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Website Name</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              
              
                <Nav.Link href="/trades">Trades</Nav.Link>
                <Nav.Link href="/securities">Securities</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          </Container>
        </Navbar> 
        </Container> 
      </>
  
    
    )
  };