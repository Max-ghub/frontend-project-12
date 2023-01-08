import { useSelector } from 'react-redux';
import getModal from '../../../modals';

const ChatModal = () => {
  const modalSettings = useSelector((state) => state.modals);
  if (!modalSettings.type) return null;

  const Modal = getModal(modalSettings.type);

  return <Modal />;
};

export { ChatModal };
