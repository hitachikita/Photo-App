import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import Banner from '../../../../components/banner';
import Images from '../../../../constants/images';
import { useSelector, useDispatch } from 'react-redux';
import Photolist from 'features/photo/components/photolist';
import { removePhoto } from 'features/photo/photoSlice';

Main.propTypes = {};

function Main(props) {
    const photos = useSelector(state => state.photos);
    const dispatch = useDispatch();
    const history = useHistory();

    const handlePhotoEditClick = (photo) => {
        console.log("Edit: ", photo);
        const editPhotoUrl = `/photos/${photo.id}/edit`;
        history.push(editPhotoUrl);
    }

    const handlePhotoRemoveClick = (photo) => {
        console.log("Remove: ", photo);
        const removePhotoId = photo.id;
        const action = removePhoto(removePhotoId);
        dispatch(action);
    }

    return (
        <div className="photo-main">
            <Banner
                title="Your awesome photos 😁"
                backgroundUrl={Images.PINK_BG} />
            <Container className="text-center">
                <div className="py-5">
                    <Link to="/photos/add">Add new photo</Link>
                </div>

                <Photolist
                    photoList={photos}
                    onPhotoEditClick={handlePhotoEditClick}
                    onPhotoRemoveClick={handlePhotoRemoveClick}
                />
            </Container>
        </div>
    );
}

export default Main;