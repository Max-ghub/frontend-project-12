/* eslint-disable import/prefer-default-export */
import { useDispatch } from 'react-redux';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
// Slices
import { actions as channelsActions } from '../../../../../slices/channelsSlice';
import { actions as modalActions } from '../../../../../slices/modalSlice';

const ChannelsPanelItem = ({ channel, currentChannelId }) => {
  const dispatch = useDispatch();

  const buildDefaultButton = () => {
    const buttonClasses = ['w-100', 'rounded-0', 'text-start', 'btn', {
      'text-truncate': channel.removable,
      'btn-secondary': channel.id === currentChannelId,
    }];

    return (
      <Button
        className={cn(buttonClasses)}
        onClick={() => dispatch(channelsActions.setCurrentChannel(channel.id))}
        variant
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    );
  };

  const buildRemovableButton = () => {
    const dropdownClasses = ['flex-grow-0', {
      'btn-secondary': channel.id === currentChannelId,
    }];

    return (
      <Dropdown as={ButtonGroup} className="d-flex">
        {buildDefaultButton()}

        <Dropdown.Toggle
          className={cn(dropdownClasses)}
          id="dropdown-split-basic"
          split
          variant
        >
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(modalActions.openModal({ type: 'removing', channel }))}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(modalActions.openModal({ type: 'renaming', channel }))}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable ? buildRemovableButton() : buildDefaultButton()}
    </li>
  );
};

export { ChannelsPanelItem };
