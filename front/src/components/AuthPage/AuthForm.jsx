import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import cn from 'classnames';
// Contexts
import { AuthContext } from '../../contexts/AuthContext';
// Routes
import routes from '../../routes';

const AuthForm = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);

  const authSchema = yup.object().shape({
    username: yup.string().min(3).required(),
    password: yup.string().min(3).required(),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(routes.loginPath(), values);
          auth.login(response.data);
          setAuthFailed(false);
          navigate('/');
        } catch (error) {
          setAuthFailed(true);
        }
      }}
      validationSchema={authSchema}
    >
      {(props) => {
        const fieldClasses = ['form-control', {
          'is-invalid': authFailed && props.submitCount,
        }];

        return (
          <Form className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Войти</h1>

            <div className="form-floating mb-3">
              <Field
                className={cn(fieldClasses)}
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Ваш ник"
                required
              />
              <label htmlFor="username">Ваш ник</label>
            </div>

            <div className="form-floating mb-3">
              <Field
                className={cn(fieldClasses)}
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Пароль"
                required
              />
              <label htmlFor="username">Пароль</label>
              {authFailed && props.submitCount ? <div className="invalid-tooltip">Неверные имя пользователя или пароль</div> : null}
            </div>

            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export { AuthForm };
