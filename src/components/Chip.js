import React, { PureComponent } from 'react';
import styled from 'styled-components';
import typography from '../mixins/typography';
import elevation, { elevationTransition } from '../mixins/elevation';
import { CancelIcon } from '../icons';

const ChipWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
  background-color: rgba(0, 0, 0, 0.08);
  height: 32px;
  border-radius: 16px;
  font-size: 13px;
  color: ${props => props.theme.textColors.primary};
  ${props =>
    props.clickable &&
    `
    :hover {
      background-color: #CECECE
    }`};
  ${props => props.removed && 'display: none'};
  :focus {
    outline: none;
    ${elevationTransition};
    ${elevation(3)};
  }
  /* Disable text highlighting of Chip labels */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Chrome and Opera */
`;

const ChipAvatar = styled.div`
  width: 32px;
  height: 32px;
  color: #616161;
  background-color: #bdbdbd;
  margin-right: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  ${typography('body')};
  font-size: 16px;
`;

const ChipLabel = styled.span`
  margin: 0 12px;
`;

const ChipDeleteIcon = styled(CancelIcon)`
  fill: ${props => props.theme.disabledCheckbox};
  :hover {
    fill: rgba(0, 0, 0, 0.4);
  }
`;

class ChipComponent extends PureComponent {
  state = {
    removed: false,
  };

  handleDeleteIconClick = (e) => {
    const { onDelete, removable } = this.props;
    if (onDelete) {
      onDelete(e);
    }
    if (removable) {
      this.setState({ removed: true });
    }
  };

  handleKeyDown = (e) => {
    const { onClick, onDelete, removable } = this.props;
    // fire onClick when Enter or Spacebar pressed
    if (onClick && (e.keyCode === 13 || e.keyCode === 32)) {
      e.preventDefault();
      onClick(e);
      // fire onDelete when Backspace or Delete pressed
    } else if ((onDelete || removable) && (e.keyCode === 8 || e.Keycode === 46)) {
      e.preventDefault();
      this.handleDeleteIconClick(e);
    }
  };

  render() {
    const {
      className,
      avatar,
      label,
      onClick,
      removable,
      removeIcon,
      onDelete,
      removed: removedProp,
    } = this.props;
    // determine if chip is managing its own removal (uncontrolled)
    // or if it's being managed by the parent (controlled)
    const removed = removedProp !== undefined ? removedProp : this.state.removed;
    const RemoveIcon = removeIcon || ChipDeleteIcon;
    return (
      <ChipWrapper
        className={className}
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
        clickable={onClick}
        removed={removed}
      >
        {avatar && <ChipAvatar>{avatar}</ChipAvatar>}
        <ChipLabel onClick={onClick}>{label}</ChipLabel>
        {(removable || onDelete) && (
          <RemoveIcon className="smc-chip-remove-icon" onClick={this.handleDeleteIconClick} />
        )}
      </ChipWrapper>
    );
  }
}

const Chip = styled(ChipComponent)`
  & .smc-chip-remove-icon {
    margin: 0 4px 0 -8px;
  }
`;
export { Chip, ChipWrapper, ChipLabel, ChipAvatar, ChipDeleteIcon };
