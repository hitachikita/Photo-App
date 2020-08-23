import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './header.scss';

Header.propTypes = {};

function Header(props) {
    return (
        <header className="header">
            <Container>
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <a
                            className="header__link header__title"
                            href="https://www.linkedin.com/in/duong-thanh-binh-6350441b2/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Linkedin
                        </a>
                    </Col>

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

export default Header;