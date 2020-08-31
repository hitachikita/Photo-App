import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './usernamefield.scss';
import { useState } from 'react';

UsernameField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

UsernameField.defaultProps = {
    field: 'text',
    label: '',
    placeholder: '',
    disabled: false,
}

function UsernameField(props) {
    const { field, form,
        type, label, placeholder, disabled } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const [divuser, setDivuser] = useState('username-div__user');

    const handleInputChange = () => {
        setDivuser('username-div__user focus');
    };
    const handleInputBlur = () => {
        setDivuser('username-div__user');
    };

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <div className="username-div">
                <div className={divuser}>
                    <FontAwesomeIcon className="user" icon={'user'} />
                </div>
                <div className={"username-div__input"}>
                    <Input
                        className="input"
                        id={name}
                        {...field}
                        onClick={handleInputChange}
                        //onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder={placeholder}
                        type='text'
                        disabled={disabled}

                    // invalid={showError}
                    />
                </div>
                <div className={showError ? 'is-invalid' : ''}></div>
                <ErrorMessage name={name} component={FormFeedback} />
            </div>
        </FormGroup>
    );
}

export default UsernameField;