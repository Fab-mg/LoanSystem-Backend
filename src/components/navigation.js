import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {FormControl} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Clients from './clients';
import Banques from './Banques';
import Prets from './Prets';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  

function NavBar() {
  return (
    <Router>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Gestion de pret bancaire</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to={"/Client"} >Client</Nav.Link>
            <Nav.Link as={Link} to={"/Banque"}>Banque</Nav.Link>
            <Nav.Link as={Link} to={"/Pret"}>Pret</Nav.Link>
            <NavDropdown title="Action" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Ajouter Client</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
              Ajouter Banque
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Enregistrement de pret
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
    <div>

        <Switch>
        <Route path="/Client">
            <div><Clients /></div>
            
        </Route>
        <Route path="/Banque">
            <div><Banques /></div>

        </Route>
        <Route path="/Pret">
            <div><Prets /></div>
        </Route>
        </Switch>

        </div>
    </Router>
  );
}

export default NavBar;