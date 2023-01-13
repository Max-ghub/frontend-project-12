/* eslint-disable import/prefer-default-export */
import { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
// Socket
import { socket } from '../../../../../socket';
// Contexts
import { AuthContext } from '../../../../../contexts/AuthContext';

const ChatBodyForm = () => {
  const { t } = useTranslation();
  const { getUsername } = useContext(AuthContext);
  const { currentChannelId } = useSelector((state) => state.channels);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const messageSchema = yup.object().shape({
    body: yup
      .string()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm }) => {
      const filteredMessage = leoProfanity.clean(body);
      const newMessageData = {
        body: filteredMessage,
        channelId: currentChannelId,
        username: getUsername(),
      };
      socket.emit('newMessage', newMessageData);
      resetForm();
    },
    validationSchema: messageSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <Form.Group className="input-group has-validation">
        <Form.Control
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.body}
          className="border-0 p-0 ps-2 form-control"
          name="body"
          placeholder={t('chatPage.body.fieldPH')}
          aria-label="Новое сообщение"
          ref={inputRef}
        />
        <button type="submit" className="btn btn-group-vertical" disabled={formik.isSubmitting || !formik.dirty}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">Отправить</span>
        </button>
      </Form.Group>
    </Form>
  );
};

export { ChatBodyForm };
