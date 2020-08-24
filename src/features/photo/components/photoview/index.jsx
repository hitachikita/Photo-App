import React, { useState } from 'react';
import PropTypes from 'prop-types';

Photoview.propTypes = {
    image: PropTypes.object.isRequired,
};

Photoview.defaultProps = {
    image: null,
}

function Photoview(props) {
    const { image } = props;
    return (
        <div className="view-photo">
            <img className="view-photo__image"
                src={image.photo}
                alt={image.title}
            />
        </div>
    );
}

export default Photoview;