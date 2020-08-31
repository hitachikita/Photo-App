import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback, Button, Spinner } from 'reactstrap';
import { ErrorMessage } from 'formik';
import './submitfield.scss';

SubmitField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    valueform: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

SubmitField.defaultProps = {
    field: 'text',
    valueform: '',
    label: '',
    placeholder: '',
    disabled: false,
    isSubmitting: false,
}

function SubmitField(props) {
    const { field, form,
        type, valueform, label, placeholder, disabled, isSubmitting } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <div>
            {/* <Input
                id='button'
                {...field}

                value={valueform}
                type={type}
                disabled={disabled}
            //invalid={showError}
            /> */}
            {/* <div className={isCorrect == false ? 'is-invalid' : ''}></div>
            <ErrorMessage name={name} component={FormFeedback} /> */}

            <Button
                id='button'
                {...field}

                value={valueform}
                type={type}
                disabled={disabled}
            //invalid={showError}
            >
                Login
                {isSubmitting && <Spinner size='sm' />}
            </Button>
        </div>
    );
}

export default SubmitField;