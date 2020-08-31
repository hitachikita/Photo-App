import Photolist from 'features/photo/components/photolist';
import Photoview from 'features/photo/components/photoview';
import { removePhoto } from 'features/photo/photoSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    FacebookIcon,
    FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, FacebookShareCount, TwitterShareButton, LinkedinShareButton, LinkedinIcon, TwitterIcon
} from "react-share";
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Banner from '../../../../components/banner';
import Images from '../../../../constants/images';
import './main.scss';

Main.propTypes = {};

function Main(props) {
    var shareUrl = "facebook.com";
    var shareTitle = "Facebook";
    const photos = useSelector(state => state.photos);
    const dispatch = useDispatch();
    const history = useHistory();

    // const { photoId } = useParams();
    // console.log("PhotoId: ", photoId);
    // const image = photos.filter(photo => photo.id === +photoId);
    // console.log({ image });

    const [modal, setModal] = useState(false);
    const [view, setView] = useState({});

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
        shareUrl = photo.photo;
        shareTitle = photo.title;
        console.log("Share Photo: ", shareUrl);
        console.log("Share Title: ", shareTitle);
    }

    // const handleDownload = () => {
    //     alert("Download ???");
    // }

    const handleDownload = () => {
        var element = document.createElement("a");
        var file = new Blob(
            [
                view.photo
            ],
            { type: "image/*" }
        );
        element.href = URL.createObjectURL(file);
        element.download = `${view.id}.jpg`;
        element.click();
    };

    return (
        <div className="photo-main">
            <Banner
                title="Your awesome photos 😜😁"
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
                    <FacebookShareButton
                        url={view.photo}
                        quote={view.title}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <div>
                        <FacebookShareCount url={view.photo}>
                            {count => count}
                        </FacebookShareCount>
                    </div>

                    <FacebookMessengerShareButton
                        url={view.photo}
                        appId="521270401588372"
                    >
                        <FacebookMessengerIcon size={32} round />
                    </FacebookMessengerShareButton>
                    <TwitterShareButton
                        url={view.photo}
                        title={view.title}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>

                    <LinkedinShareButton url={view.photo} >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>

                    <Button color="primary" onClick={handleDownload}>Download</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

export default Main;