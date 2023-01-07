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

const AuthForm = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);

  const authSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.login(response.data);
        setAuthFailed(false);
        navigate('/');
      } catch (error) {
        console.log(values);
        setAuthFailed(true);
      }
    },
    validationSchema: authSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
          id="username"
          name="username"
          autoComplete="username"
          placeholder="Ваш ник"
          required
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Пароль"
          required
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
        {authFailed && <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>}
      </Form.Group>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary" placement="right">
        Войти
      </Button>
    </Form>
  );
};

export { AuthForm };
