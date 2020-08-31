import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './passwordfield.scss';
import { useState } from 'react';

PasswordField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

PasswordField.defaultProps = {
    field: 'text',
    label: '',
    placeholder: '',
    disabled: false,
}

function PasswordField(props) {
    const { field, form,
        label, placeholder, disabled } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const [eye, setEye] = useState('eye-slash');
    const [type, setType] = useState('password');
    const [divlock, setDivlock] = useState('password-div__lock');
    const [dvieye, setDiveye] = useState('password-div__eye');


    const handleEyePassword = () => {
        if (eye === 'eye-slash') {
            setEye('eye');
            setType('text');
        } else {
            setEye('eye-slash');
            setType('password');
        }
    };

    const handleInputChange = () => {
        setDivlock('password-div__lock focus');
        setDiveye('password-div__eye focus');
    };

    const handleInputBlur = () => {
        setDivlock('password-div__lock');
        setDiveye('password-div__eye');
    };

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <div className="password-div">
                <div className={divlock}>
                    <FontAwesomeIcon className="lock" icon={'lock'} />
                </div>
                <div className="password-div__input">
                    <Input
                        className="input"
                        id={name}
                        {...field}
                        onClick={handleInputChange}
                        // onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder={placeholder}
                        type={type}
                        disabled={disabled}

                        invalid={showError}
                    />
                </div>
                <div className={dvieye}>
                    <FontAwesomeIcon
                        className="eye"
                        icon={eye}
                        onClick={handleEyePassword}
                    />
                </div>
                <div className={showError ? 'is-invalid' : ''}></div>
                <ErrorMessage name={name} component={FormFeedback} />
            </div>
        </FormGroup>
    );
}

export default PasswordField;