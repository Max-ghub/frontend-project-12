import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Images
import authImage from './authPageImage.jpg';
// Components
import { AuthForm } from './AuthPageElements/AuthForm';

const AuthPage = () => {
  const { t } = useTranslation();
  const CardBody = (
    <div className="card-body row p-5">
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img className="rounded-circle" src={authImage} alt="Войти" />
      </div>
      <AuthForm />
    </div>
  );

  const CardFooter = (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{`${t('loginPage.footer.text')} `}</span>
        <Link to="/signup">{t('loginPage.footer.anchor')}</Link>
      </div>
    </div>
  );

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            {CardBody}
            {CardFooter}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AuthPage };
