/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
// Slices
import { actions as channelActions } from '../../slices/channelsSlice';
import { actions as modalActions } from '../../slices/modalSlice';
// Socket
import { socket } from '../../socket';

const Remove = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.modals.item);
  const { currentChannelId } = useSelector((state) => state.channels);

  const onHide = () => dispatch(modalActions.closeModal());

  const removeChannel = () => {
    socket.emit('removeChannel', { id });
    if (currentChannelId === id) dispatch(channelActions.setCurrentChannel(1));
    onHide();
    toast.success(t('toast.remove'));
  };

  return (
    <Modal onHide={onHide} show centered>

      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.remove.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.remove.body')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={onHide}>
            {t('modals.remove.concel')}
          </Button>
          <Button variant="danger" onClick={removeChannel}>
            {t('modals.remove.confirm')}
          </Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export { Remove };
