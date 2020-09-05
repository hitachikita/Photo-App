import Images from 'constants/images';
import React, { useRef } from 'react';
import './profile.scss';
import HeaderLogged from 'components/header/logged';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { updateUser } from 'app/userSlice';

Profile.propTypes = {};

function Profile(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector(state => state.user);

    const [name, setName] = useState('');

    var imgUrl, email;
    imgUrl = Images.USER;

    const user = users.current.user;
    if (user) {
        console.log("Avatar:..", user.imgUrl);
        imgUrl = user.imgUrl;
        // setName(user.name);
        email = user.email;
    }

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = () => {
        // Update "name" redux and update database to server
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Call funtion update
                const newName = name;
                console.log("newName:..", newName);
                const action = updateUser(newName)
                dispatch(action);
                // Call Api update database to server
            }, 1000);
            history.push('/logged');
            resolve(true);
        });
    }


    return (
        <div>
            {/* <HeaderLogged /> */}
            <div className="container">
                <div className="content">
                    <form onSubmit={handleSubmit}>
                        <div className="header">
                            <div className="below">
                                <div className="img">
                                    <img src={imgUrl} alt="" />
                                </div>
                                <div className="title">
                                    <h3 className='welcom'>Welcom,</h3>
                                    <h3>{name}</h3>
                                </div>
                            </div>
                            <p>Manage your PhotoApp account settings.</p>
                        </div>

                        <div className="input">

                            <span className='a1'>
                                <label className='email-label'>Email</label>
                                <span className='email' >{email}</span>
                            </span>

                            <span className='a2'>
                                <label className='name-label'>Name</label>
                                <input className='name' type='text' defaultValue={user.name} onChange={handleChange} />
                            </span>
                        </div>

                        <div className='button-submit' >
                            <input type='submit' name='submit' value='Save changes' class="button" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;