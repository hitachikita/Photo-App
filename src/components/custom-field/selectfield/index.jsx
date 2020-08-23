import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import Select from 'react-select';
import { ErrorMessage } from 'formik';

Selectfield.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

Selectfield.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
}

function Selectfield(props) {
    const { field, form,
        label, placeholder, disabled, options } = props;
    const { name, value } = field;
    const selectedOption = options.find(option => option.value === value);
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        };

        field.onChange(changeEvent);
    }

    return (
        <FormGroup>
            <Label for="categoryId">Category</Label>
            <Select
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleSelectedOptionChange}
                placeholder={placeholder}
                options={options}

                className={showError ? 'is-invalid' : ''}
            />
            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
}

export default Selectfield;