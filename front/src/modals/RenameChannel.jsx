import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
// Slices
import { actions as modalActions } from '../slices/modalSlice';
// Socket
import { socket } from '../socket';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.modals);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onHide = () => dispatch(modalActions.closeModal());

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      socket.emit('renameChannel', { id: item.id, name });
      onHide();
    },
  });

  return (
    <Modal show centered>

      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          Переименовать канал
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputRef}
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>

            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" onClick={onHide}>
                Отменить
              </Button>
              <Button type="submit" variant="primary">
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export { RenameChannel };
