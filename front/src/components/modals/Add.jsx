import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
// Slices
import { actions as modalActions } from '../../slices/modalSlice';
import { channelSelectors } from '../../slices/channelsSlice';
// Socket
import { socket } from '../../socket';

// BEGIN (write your solution here)
const Add = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onHide = () => dispatch(modalActions.closeModal());

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelsNames = useSelector(channelSelectors.selectAll)
    .map((channel) => channel.name);
  const nameSchema = yup.object().shape({
    name: yup
      .string()
      .required()
      .min(3)
      .max(20)
      .notOneOf(channelsNames),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      socket.emit('newChannel', { name });
      onHide();
      toast.success(t('toast.add'));
    },
    validationSchema: nameSchema,
  });
  const isInvalid = formik.touched.name && formik.errors.name;

  return (
    <Modal show centered>

      <Modal.Header onHide={onHide} closeButton>
        <Modal.Title>
          {t('modals.add.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mb-2"
              isInvalid={isInvalid}
              id="name"
              name="name"
              ref={inputRef}
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            {isInvalid && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}

            <div className="d-flex justify-content-end">
              <Button onClick={onHide} className="me-2" variant="secondary">
                {t('modals.add.concel')}
              </Button>
              <Button type="submit">
                {t('modals.add.confirm')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>

    </Modal>
  );
};
// END
export { Add };