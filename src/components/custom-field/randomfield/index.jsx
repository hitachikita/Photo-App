import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import Random from '../random';
import { ErrorMessage } from 'formik';

Randomfield.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
};

Randomfield.defaultProps = {
    label: '',
}

function Randomfield(props) {
    const { field, form, label } = props;
    const { name, value, onBlur } = field;

    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleImageUrlChange = (newImageUrl) => {
        form.setFieldValue(name, newImageUrl);
    }

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <Random
                name={name}
                imageUrl={value}
                onChangeImageUrl={handleImageUrlChange}
                onBlurButton={onBlur}
            />
            <div className={showError ? 'is-invalid' : ''}></div>
            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
}

export default Randomfield;