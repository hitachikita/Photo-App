import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Photocard from '../photocard';

Photolist.propTypes = {
    photoList: PropTypes.array,
    onPhotoEditClick: PropTypes.func,
    onPhotoRemoveClick: PropTypes.func,
    onPhotoImageClick: PropTypes.func,
};

Photolist.defaultProps = {
    photoList: [],
    onPhotoEditClick: null,
    onPhotoRemoveClick: null,
    onPhotoImageClick: null,
}

function Photolist(props) {
    const { photoList, onPhotoEditClick, onPhotoRemoveClick, onPhotoImageClick } = props;
    return (
        <Row>
            {photoList.map(photo => (
                <Col key={photo.title} xs='12' md='6' lg='3'>
                    <Photocard
                        photo={photo}
                        onEditClick={onPhotoEditClick}
                        onRemoveClick={onPhotoRemoveClick}
                        onImageClick={onPhotoImageClick}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default Photolist;