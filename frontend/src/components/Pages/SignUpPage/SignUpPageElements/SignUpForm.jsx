import {
  useEffect, useState, useContext, useRef,
} from 'react';
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
  const usernameRef = useRef(null);
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const [signUpFailed, setSignUpFeild] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

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
      .oneOf([yup.ref('password')], t('signUpPage.errors.oneOf')),
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
        if (error.response.status === 409) {
          setSignUpFeild(true);
          usernameRef.current.select();
        }
        throw error;
      }
    },
    validationSchema: signupSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('signUpPage.title')}</h1>

      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={(formik.touched.username && formik.errors.username) || signUpFailed}
          onBlur={formik.handleBlur}
          ref={usernameRef}
          type="text"
          id="username"
          name="username"
          autoComplete="username"
          placeholder={t('signUpPage.fields.name')}
          required
        />
        <Form.Label htmlFor="username">{t('signUpPage.fields.name')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">{formik.errors.username}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={(formik.touched.password && formik.errors.password) || signUpFailed}
          onBlur={formik.handleBlur}
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          aria-describedby="passwordHelpBlock"
          placeholder={t('signUpPage.errors.password')}
          required
        />
        <Form.Label htmlFor="password">{t('signUpPage.fields.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">{formik.errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-floating mb-4">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={signUpFailed || formik.errors.confirmPassword}
          onBlur={formik.handleBlur}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder={t('signUpPage.fields.confirmPassword')}
          required
        />
        <Form.Label htmlFor="confirmPassword">{t('signUpPage.fields.confirmPassword')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {signUpFailed ? t('signUpPage.errors.existedUser') : formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className="w-100" variant="outline-primary">
        {t('signUpPage.submit')}
      </Button>
    </Form>
  );
};

export { SignUpForm };
