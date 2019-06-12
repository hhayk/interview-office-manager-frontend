import React, { Component } from 'react';
import {  NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap'

class Header extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Juniqe</Navbar.Brand>
                <Nav>
                    <Nav.Link as={NavLink} to='/office'>Office</Nav.Link>
                    <Nav.Link as={NavLink} to='/shipment'>Shipment</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Header;