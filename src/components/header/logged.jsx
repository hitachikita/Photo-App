import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './header.scss';

HeaderLogged.propTypes = {};

function HeaderLogged(props) {
    return (
        <header className="header">
            <Container>
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <NavLink
                            exact
                            className="header__link"
                            to="/photos"
                            activeClassName="header_link--active"
                        >
                            Home
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default HeaderLogged;