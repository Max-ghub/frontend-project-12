import { useSelector } from 'react-redux';
// Modals
import getModal from '../modals';

const Modal = () => {
  const modalSettings = useSelector((state) => state.modals);
  if (!modalSettings.type) return null;

  const Component = getModal(modalSettings.type);

  return <Component />;
};

export { Modal };
