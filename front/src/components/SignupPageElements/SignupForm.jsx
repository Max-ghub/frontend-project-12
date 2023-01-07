import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
// Contexts
import { AuthContext } from '../../contexts/AuthContext';
// Routes
import routes from '../../routes';

const SignupForm = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [signupFailed, setSignupFeild] = useState(false);

  const signupSchema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required().min(6).oneOf([yup.ref('password')]),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        setSignupFeild(false);
        const response = await axios.post(routes.signupPath(), { username, password });
        auth.login(response.data);
        navigate('/');
      } catch (error) {
        setSignupFeild(true);
      }
    },
    validationSchema: signupSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">Регистрация</h1>

      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={signupFailed && formik.errors.username}
          id="username"
          name="username"
          autoComplete="username"
          placeholder="От 3 до 20 символов"
          required
        />
        <Form.Label>Имя пользователя</Form.Label>
        {signupFailed && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={signupFailed && formik.errors.password}
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder="Не менее 6 символов"
          aria-describedby="passwordHelpBlock"
          required
        />
        <Form.Label>Пароль</Form.Label>
        {signupFailed && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="form-floating mb-4">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={signupFailed}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Пароли должны совпадать"
          required
        />
        <Form.Label>Подтвердите пароль</Form.Label>
        {signupFailed && (
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.confirmPassword || 'Такой пользователь уже существует'}
        </Form.Control.Feedback>
        )}
      </Form.Group>

      <Button type="submit" className="w-100" variant="outline-primary">Зарегистрироваться</Button>
    </Form>
  );
};

export { SignupForm };
