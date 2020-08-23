import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../../../../components/banner';
import Photoform from '../../components/photoform';
import Images from '../../../../constants/images';
import './edit.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addPhoto, updatePhoto } from 'features/photo/photoSlice';

Edit.propTypes = {};

function Edit(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();
    const isAddmode = !photoId;

    const editedPhoto = useSelector(state => state.photos.find(x => x.id === +photoId));

    const initialValues = isAddmode
        ? {
            title: '',
            categoryId: null,
            photo: '',
        }
        : editedPhoto;

    const handleSubmit = (values) => {
        return new Promise(resolve => {
            console.log("Form submit: ", values);

            setTimeout(() => {
                if (isAddmode) {
                    const action = addPhoto(values);
                    console.log({ action });
                    dispatch(action);
                } else {
                    // Do something 
                    const action = updatePhoto(values);
                    dispatch(action);
                }
                history.push('/photos');
                resolve(true);
            }, 1000);
        });
    }

    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo 😜😊"
                backgroundUrl={Images.BLUE_BG} />
            <div className="photo-edit__form">
                <Photoform
                    initialValues={initialValues}
                    isAddmode={isAddmode}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default Edit;