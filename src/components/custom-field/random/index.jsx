import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import './random.scss';

Random.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onChangeImageUrl: PropTypes.func,
    onBlurButton: PropTypes.func,
};

Random.defaultProps = {
    name: '',
    imageUrl: '',
    onChangeImageUrl: null,
    onBlurButton: null,
}

const getRandomImageUrl = () => {
    const randomId = Math.trunc(Math.random() * 1000);
    return `https://picsum.photos/id/${randomId}/300/300`;
}

function Random(props) {
    const { name, imageUrl, onChangeImageUrl, onBlurButton } = props;

    const handleRandomPhotoClick = async () => {
        if (onChangeImageUrl) {
            const randomImageUrl = getRandomImageUrl();
            onChangeImageUrl(randomImageUrl);
        }
    }

    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <Button
                    outline
                    name={name}
                    color='primary'
                    onBlur={onBlurButton}
                    onClick={handleRandomPhotoClick}
                >
                    Random a photo
                </Button>
            </div>

            <div className="random-photo__image">
                {imageUrl && <img src={imageUrl} alt='Oops ... not found. Please click random again!' onError={handleRandomPhotoClick} />}
            </div>
        </div>
    );
}

export default Random;