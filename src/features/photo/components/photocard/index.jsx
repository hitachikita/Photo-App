import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './photocard.scss';

Photocard.propTypes = {
    photo: PropTypes.object,
    onEditClick: PropTypes.func,
    onRemoveClick: PropTypes.func,
    onImageClick: PropTypes.func,
};

Photocard.defaultProps = {
    photo: {},
    onEditClick: null,
    onRemoveClick: null,
    onImageClick: null,
}



function Photocard(props) {

    const { photo, onEditClick, onRemoveClick, onImageClick } = props;

    const handleEditClick = () => {
        if (onEditClick) onEditClick(photo);
    }

    const handleRemoveClick = () => {
        if (onRemoveClick) onRemoveClick(photo);
    }

    const handleClick = () => {
        if (onImageClick) onImageClick(photo);
    }


    return (
        <div className='photo'>
            <div onClick={handleClick}>
                <img
                    src={photo.photo}
                    alt={photo.title} />
            </div>

            <div className='photo__overlay'>
                <h3 className='photo__title'>{photo.title}</h3>

                <div className='photo__actions'>
                    <div>
                        <Button outline size='sm' color='light' onClick={handleEditClick}>
                            Edit
                        </Button>
                    </div>

                    <div>
                        <Button outline size='sm' color='danger' onClick={handleRemoveClick}>
                            Remove
                        </Button>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Photocard;