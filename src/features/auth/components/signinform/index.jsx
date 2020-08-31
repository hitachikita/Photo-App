import PasswordField from 'components/custom-field/passwordfield';
import SubmitField from 'components/custom-field/submitfield';
import UsernameField from 'components/custom-field/usernamefield';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';
import './signinform.scss';
import * as Yup from 'yup';
import { Spinner } from 'reactstrap';

SigninForm.propTypes = {
    onSubmit: PropTypes.func,
    isCorrect: PropTypes.bool,
};

SigninForm.defaultProps = {
    onSubmit: null,
    isCorrect: false,
}

function SigninForm(props) {
    const { onSubmit, isCorrect } = props;
    const initialValues = {
        "username": '',
        "password": '',
        "submit": '',
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is require."),

        password: Yup.string().required("This field is require."),

        // submit: Yup.string().required("Username or password is incorrect!"),

    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formikProps => {
                const { values, errors, touched, isSubmitting } = formikProps;
                //console.log({ values, errors, touched });
                return (
                    <Form className="form">
                        <FastField
                            name='username'
                            component={UsernameField}

                            // label='Username'
                            type='text'
                            placeholder='Email'
                        />

                        <FastField
                            name='password'
                            component={PasswordField}

                            // label='Password'
                            placeholder='Password'
                        />

                        <FastField
                            name='submit'
                            component={SubmitField}

                            valueform='Login'
                            type='submit'
                            isSubmitting={isSubmitting}
                        />
                    </Form>
                );
            }}
        </Formik>
    );
}

export default SigninForm;