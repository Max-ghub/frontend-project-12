import { useSelector } from 'react-redux';
import { ChatTitle } from './ChatTitle';
import { ChatSendForm } from './ChatSendForm';
import { selectors } from '../../../../slices/messagesSlice';

const ChatMessages = ({ channelId }) => {
  const messages = useSelector(selectors.selectAll);
  const messagesChannel = messages.filter((item) => item.channelId === channelId);
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
