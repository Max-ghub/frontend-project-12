/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
// Slices
import { messageSelectors } from '../../../../../slices/messagesSlice';
// Components
import { ChatBodyTitle } from './ChatBodyTitle';
import { ChatBodyForm } from './ChatBodyForm';

const ChatBody = () => {
  const channelList = useSelector((state) => state.channels);
  const { currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = Object.values(channelList.entities)
    .find(({ id }) => currentChannelId === id);
  const currentChannelName = currentChannel ? currentChannel.name : '';

  const messagesList = useSelector(messageSelectors.selectAll);
  const messagesOfChannel = messagesList.filter((item) => item.channelId === currentChannelId);
  const messagesOfChannelCount = messagesOfChannel.length;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatBodyTitle
          channelName={currentChannelName}
          messagesCount={messagesOfChannelCount}
        />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesOfChannel.map(({ id, body, username }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              {`: ${body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <ChatBodyForm />
        </div>
      </div>
    </div>
  );
};

export { ChatBody };
