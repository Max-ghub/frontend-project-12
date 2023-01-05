import { useSelector } from 'react-redux';
// Components
import { ChatTitle } from './ChatTitle';
import { ChatSendForm } from './ChatSendForm';
// Slices
import { messageSelectors } from '../../../../slices/messagesSlice';

const ChatMessages = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const messages = useSelector(messageSelectors.selectAll);
  const messagesChannel = messages.filter((item) => item.channelId === currentChannelId);
  const messagesChannelCount = messagesChannel.length;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatTitle messagesCount={messagesChannelCount} />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesChannel.map(({ id, body, username }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              {': '}
              {body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <ChatSendForm />
        </div>
      </div>
    </div>
  );
};

export { ChatMessages };
