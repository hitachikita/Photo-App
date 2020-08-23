import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FastField } from 'formik';
import InputField from '../../../../components/custom-field/inputfield';
import Selectfield from '../../../../components/custom-field/selectfield';
import { PHOTO_CATEGORY_OPTIONS } from '../../../../constants/global';
import Randomfield from 'components/custom-field/randomfield';
import { FormGroup, Button, Spinner } from 'reactstrap';
import * as Yup from 'yup';

Photoform.propTypes = {
    onSubmit: PropTypes.func,
};

Photoform.defaulrProps = {
    onSubmit: null,
}

function Photoform(props) {
    const { initialValues, isAddmode } = props;

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("This field is require."),

        categoryId: Yup.number().required("This field is require").nullable(),

        photo: Yup.string().when('categoryId', {
            is: 1,
            then: Yup.string().required("This field is require."),
            otherwise: Yup.string().notRequired(),
        })
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}
        >
            {formikProps => {
                // Do somthing here ...
                const { values, errors, touched, isSubmitting } = formikProps;
                console.log({ values, errors, touched });

                return (
                    <Form>
                        <FastField
                            name="title"
                            component={InputField}

                            label="Title"
                            placeholder='Eg: Wow nature ...'
                        />

                        <FastField
                            name="categoryId"
                            component={Selectfield}

                            label="Category"
                            placeholder="What's your photo category?"
                            options={PHOTO_CATEGORY_OPTIONS}
                        />

                        <FastField
                            name="photo"
                            component={Randomfield}
                            label="Photo"
                        />

                        <FormGroup>
                            <Button type="submit" color={isAddmode ? "primary" : "success"}>
                                {isSubmitting && <Spinner size='sm' />}
                                {isAddmode ? 'Add to album' : 'Update photo'}</Button>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default Photoform;