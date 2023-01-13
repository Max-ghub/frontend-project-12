/* eslint-disable import/prefer-default-export */
import { useTranslation } from 'react-i18next';

const ChatBodyTitle = ({ channelName, messagesCount }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${channelName}`}</b>
      </p>
      <span className="text-muted">
        {`${messagesCount} ${t('chatPage.body.title.messages')}`}
      </span>
    </div>
  );
};

export { ChatBodyTitle };
