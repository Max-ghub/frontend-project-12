import { useDispatch } from 'react-redux';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
// Slices
import { actions as channelsActions } from '../../../../slices/channelsSlice';
import { actions as modalActions } from '../../../../slices/modalSlice';

const ChannelItem = ({ item, channelId }) => {
  const dispatch = useDispatch();

  const buttonClasses = ['w-100', 'rounded-0', 'text-start', 'btn', {
    'text-truncate': item.removable,
    'btn-secondary': item.id === channelId,
  }];

  const dropdownClasses = ['flex-grow-0', {
    'btn-secondary': item.id === channelId,
  }];

  const buildDefaultButton = () => {
    return (
      <Button
        className={cn(buttonClasses)}
        onClick={() => dispatch(channelsActions.setCurrentChannel(item.id))}
        variant
      >
        <span className="me-1">#</span>
        {item.name}
      </Button>
    );
  };

  const buildRemovableButton = () => {
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
          <Dropdown.Item onClick={() => dispatch(modalActions.openModal({ type: 'removing', item }))}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(modalActions.openModal({ type: 'renaming', item }))}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <li key={item.id} className="nav-item w-100">
      {item.removable ? buildRemovableButton() : buildDefaultButton()}
    </li>
  );
};

export { ChannelItem };
