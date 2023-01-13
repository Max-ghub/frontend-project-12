/* eslint-disable import/prefer-default-export */
import { Link } from 'react-router-dom';
import notFoundImage from './notFoundPageImage.svg';

const NotFoundPage = () => (
  <div className="text-center">
    <img className="img-fluid h-25" src={notFoundImage} alt="Страница не найдена" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      {'Но вы можете перейти '}
      <Link to="/">на главную страницу</Link>
    </p>
  </div>
);

export { NotFoundPage };
