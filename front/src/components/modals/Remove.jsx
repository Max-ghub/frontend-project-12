import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
// Slices
import { actions as channelActions } from '../../slices/channelsSlice';
import { actions as modalActions } from '../../slices/modalSlice';
// Socket
import { socket } from '../../socket';

const Remove = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.modals.item);
  const { currentChannelId } = useSelector((state) => state.channels);

  const onHide = () => dispatch(modalActions.closeModal());

  const removeChannel = () => {
    socket.emit('removeChannel', { id });
    if (currentChannelId === id) dispatch(channelActions.setCurrentChannel(1));
    onHide();
  };

  return (
    <Modal show centered>

      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
          <Button variant="danger" onClick={removeChannel}>Удалить</Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export { Remove };
