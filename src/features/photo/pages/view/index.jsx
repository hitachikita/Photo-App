import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './view.scss';

View.propTypes = {};

function View(props) {
    const photos = useSelector(state => state.photos);
    const { photoId } = useParams();
    console.log("PhotoId: ", photoId);
    const image = photos.filter(photo => photo.id === +photoId);
    console.log({ image });
    return (
        <div className="view-photo">
            {image.map(imageUrl => (
                <div>
                    <p className="view-photo__title">
                        {imageUrl.title}
                    </p>
                    <img className="view-photo__image"
                        src={imageUrl.photo}
                        alt={imageUrl.title}
                    />
                </div>
            ))}
        </div>
    );
}

export default View;