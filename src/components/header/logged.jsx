import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import './header.scss';
import Images from 'constants/images';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { signOutUser } from 'app/userSlice';
import { signOutPhoto } from '../../features/photo/photoSlice';
import { useDispatch } from 'react-redux';

HeaderLogged.propTypes = {
    user: PropTypes.object,
    photos: PropTypes.object,
};

HeaderLogged.defaultProps = {
    user: {
        name: '',
        imgUrl: '',
        // imgUrl: Images.USER,
    },
    photos: {}
};

function HeaderLogged(props) {
    const { user, photos } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const [dropdown, setDropdown] = useState('dropdown-content');

    const handleMenuOpen = () => {
        setDropdown('dropdown-content show');
    };

    const handleMenuClose = () => {
        setDropdown('dropdown-content');
    };

    const handleOpenProfile = () => {
        return new Promise(resolve => {
            const id = user.id;
            history.push(`/profile/${id}`);
            resolve(true);
        });
    };

    const handleCloseProfile = () => {
        setModal(!modal);
    };

    const handleSignOut = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                const actionUser = signOutUser(user);
                console.log({ actionUser });
                dispatch(actionUser);

                const actionPhoto = signOutPhoto(photos);
                console.log({ actionPhoto });
                dispatch(actionPhoto);
            }, 1000);
            history.push('/photos');
            resolve(true);
        });
    };


    return (
        <header className="header">
            <Container>
                {/* <Modal isOpen={modal} toggle={handleOpenProfile} className="modal-profile">
                    <ModalHeader toggle={handleCloseProfile}></ModalHeader>

                    <ModalBody>
                        Hello Everyone!
                </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </Modal> */}

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

                    <Col xs="auto">
                        <div className="header__profile">
                            <div className="dropdown">
                                <OutsideClickHandler onOutsideClick={handleMenuClose}>
                                    <img
                                        src={user.imgUrl}
                                        alt=""
                                        className="avatar"
                                        onClick={handleMenuOpen}
                                    />
                                </OutsideClickHandler>
                                <div className={dropdown}>
                                    <Button onClick={handleOpenProfile}>My Account</Button>
                                    <Button onClick={handleSignOut}>Sign Out</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default HeaderLogged;