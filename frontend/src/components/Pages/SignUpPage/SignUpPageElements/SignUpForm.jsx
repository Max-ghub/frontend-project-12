import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
// Contexts
import { AuthContext } from '../../../../contexts/AuthContext';
// Routes
import routes from '../../../../routes';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const [signUpFailed, setSignUpFeild] = useState(false);
  // console.log(isSubmited, signUpFailed);
  const minUsername = 3;
  const maxUsername = 20;
  const minPassword = 6;
  const signupSchema = yup.object().shape({
    username: yup
      .string()
      .required(t('signUpPage.errors.required'))
      .min(minUsername, t('signUpPage.errors.usernameLength', { min: minUsername, max: maxUsername }))
      .max(maxUsername, t('signUpPage.errors.usernameLength', { min: minUsername, max: maxUsername }))
      .trim(),
    password: yup
      .string()
      .required(t('signUpPage.errors.required'))
      .min(minPassword, t('signUpPage.errors.passwordLength', { min: minPassword }))
      .trim(),
    confirmPassword: yup
      .string()
      .required(t('signUpPage.errors.required'))
      .min(minPassword, t('signUpPage.errors.oneOf', { min: minPassword }))
      .oneOf([yup.ref('password')], t('signUpPage.errors.oneOf'))
      .trim(),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        const response = await axios.post(routes.signupPath(), { username, password });
        auth.login(response.data);
        navigate('/');
      } catch (error) {
        setSignUpFeild(true);
      }
    },
    validationSchema: signupSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('signUpPage.title')}</h1>
      {console.log(formik)}
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.touched.username && formik.errors.username}
          id="username"
          name="username"
          autoComplete="username"
          required
        />
        <Form.Label>{t('signUpPage.fields.name')}</Form.Label>
        {formik.touched.username && formik.errors.username && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.touched.password && formik.errors.password}
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          aria-describedby="passwordHelpBlock"
          required
        />
        <Form.Label>{t('signUpPage.fields.password')}</Form.Label>
        {formik.touched.password && formik.errors.password && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="form-floating mb-4">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={signUpFailed
            || (formik.touched.confirmPassword && formik.errors.confirmPassword)}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Пароли должны совпадать"
          required
        />
        <Form.Label>{t('signUpPage.fields.confirmPassword')}</Form.Label>
        {(!signUpFailed && formik.touched.confirmPassword && formik.errors.confirmPassword) && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>}
        {(signUpFailed) && <Form.Control.Feedback type="invalid" tooltip>{t('signUpPage.errors.existedUser')}</Form.Control.Feedback>}
      </Form.Group>

      <Button type="submit" className="w-100" variant="outline-primary">
        {t('signUpPage.submit')}
      </Button>
    </Form>
  );
};

export { SignUpForm };
