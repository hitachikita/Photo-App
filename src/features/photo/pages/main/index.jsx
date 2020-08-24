import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import Banner from '../../../../components/banner';
import Images from '../../../../constants/images';
import { useSelector, useDispatch } from 'react-redux';
import Photolist from 'features/photo/components/photolist';
import { removePhoto } from 'features/photo/photoSlice';
import Photoview from 'features/photo/components/photoview';
import './main.scss';

Main.propTypes = {};

function Main(props) {
    const photos = useSelector(state => state.photos);
    const dispatch = useDispatch();
    const history = useHistory();

    // const { photoId } = useParams();
    // console.log("PhotoId: ", photoId);
    // const image = photos.filter(photo => photo.id === +photoId);
    // console.log({ image });

    const [modal, setModal] = useState(false);
    const [view, setView] = useState();

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

    const handlePhotoClick = (photo) => {
        setView(photo);
        setModal(!modal);
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
                    onPhotoImageClick={handlePhotoClick}
                />
            </Container>

            <Modal isOpen={modal} toggle={handlePhotoClick} className="modal-photo">
                <ModalHeader toggle={handlePhotoClick}></ModalHeader>

                <ModalBody>
                    <Photoview image={view} />
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={handlePhotoClick}>Share</Button>
                    <Button color="primary" onClick={handlePhotoClick}>Download</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

export default Main;