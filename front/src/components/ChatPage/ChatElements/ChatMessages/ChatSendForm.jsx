import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
// socket
import { socket } from '../../../../socket';
// Contexts
import { AuthContext } from '../../../../contexts/AuthContext';

const ChatSendForm = () => {
  const { getUsername } = useContext(AuthContext);
  const { currentChannelId } = useSelector((state) => state.channels);

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={({ body }, { resetForm }) => {
        const newMessageData = {
          body,
          channelId: currentChannelId,
          username: getUsername(),
        };
        socket.emit('newMessage', newMessageData);
        resetForm();
      }}
    >
      <Form className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <Field
            className="border-0 p-0 ps-2 form-control"
            name="body"
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
          />
          <button type="submit" className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export { ChatSendForm };
