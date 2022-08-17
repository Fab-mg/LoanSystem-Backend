import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {Link} from "react-router-dom";

export const NavBar = ()=>{
  return (
    <Navbar bg="light" expand="lg" style={{
      width:"100%",
      marginBottom:'50px'
    }}>
      <Container fluid>
        <Navbar.Brand href="#" style={{
          fontWeight:'700',
          fontSize:'15px'
          }}>
            GESTION DE PRÊT BANCAIRE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link style={{
                width:'150px', 
                textAlign:'center',
                fontWeight:'500'
              }} as={Link} to={"/Client"} >
                CLIENT
            </Nav.Link>
            <Nav.Link style={{
                width:'150px', 
                textAlign:'center',
                fontWeight:'500'
              }} as={Link} to={"/Banque"}>BANQUE</Nav.Link>
            <Nav.Link style={{
                width:'150px', 
                textAlign:'center',
                fontWeight:'500'
              }} as={Link} to={"/Pret"}>PRÊT</Nav.Link>
            <NavDropdown style={{
                width:'150px', 
                textAlign:'center',
                fontWeight:'500'
              }} title="ACTION" id="navbarScrollingDropdown">
              <NavDropdown.Item  >
                <Nav.Link as={Link} to={"/AddClient"}>AJOUTER CLIENT</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                <Nav.Link as={Link} to={"/AddBanque"}>AJOUTER BANQUE</Nav.Link>
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}


