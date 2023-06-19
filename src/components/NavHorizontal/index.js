import React from "react";
import { Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import "./style.css";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
function NavHorizontal() {
  return (
    <Navbar className="navbar" bg="body-tertiary" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><DragIndicatorIcon/><ShoppingBagIcon/><div className="textlogo">RevendaPlus</div></Navbar.Brand>
        <div className="menu">
          <Row>
            <Col>
              <NavDropdown
                title={
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
                }
                id="navbarDropdownMenuAvatar"
                className="menu-item"
              >
                <NavDropdown.Item href="#action/4.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/4.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Col>
            <Col>
              <NavDropdown
                title={<i className="fa-solid fa-bell"></i>}
                id="navbarDropdownMenuAvatar"
                className="menu-item"
              >
                <NavDropdown.Item href="#action/4.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/4.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Col>
          </Row>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavHorizontal;
