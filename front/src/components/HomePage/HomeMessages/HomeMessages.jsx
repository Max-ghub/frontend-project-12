import { HomeTitle } from './HomeMessagesTitle';
import { HomeMessagesForm } from './HomeMessagesForm';

const HomeMessages = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <HomeTitle />
        <div id="messages-box" className="chat-messages overflow-auto px-5 " />
        <div className="mt-auto px-5 py-3">
          <HomeMessagesForm />
        </div>
      </div>
    </div>
  );
};

export { HomeMessages };
