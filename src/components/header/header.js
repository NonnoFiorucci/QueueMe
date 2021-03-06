import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import logo from '../media/LogoQME.png';




class Header extends Component {

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
                    <Navbar.Brand href={ROUTES.LANDING}>
                        <img src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        /></Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse  >
                        <Nav className="justify-content-end" style={{ width: "100%" }}>
                          

                           
                            {((this.props.role === ROLES.OPERATOR) || (this.props.role === ROLES.ADMIN))
                                ? <Nav.Link className="headLink" href={ROUTES.OPERATOR}>Operator Panel</Nav.Link> : null } 
                            {((this.props.role === ROLES.COMPANY) || (this.props.role === ROLES.ADMIN)) 
                                ? <Nav.Link className="headLink" href={ROUTES.COMPANY}>Manage Company</Nav.Link> : null }

                                 <Nav.Link className="headLink"  href={ROUTES.INFO}>Info</Nav.Link>
                                 {((this.props.role === ROLES.USER) || (this.props.role === ROLES.ADMIN)) 
                                ? <Nav.Link className="headLink" href={'/faq/user'}>Faq</Nav.Link> : null }

                                <NavDropdown drop={"left"} className="drop"  title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item className="headDropItem" href={ROUTES.PROFILE}>My Profile</NavDropdown.Item>
                                
                                <NavDropdown.Item className="headDropItem" href={ROUTES.DELPRO}>Delete Accaunt</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="headDropItem" href={ROUTES.LOGOUT}>Logout</NavDropdown.Item>

                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );

    }

}

export default Header;

