// @flow
import React, { Component } from 'react';
// $FlowFixMe
import type { SyntheticMouseEvent } from 'react';

import {
  addDocumentListeners,
  addWindowListeners,
  removeDocumentListeners,
  removeWindowListeners,
  targetIsDescendant
} from '../../utils/events';

type Props = {
  children: Function,
  optionsIsOpen: boolean,
  optionsRef: ?Object,
  rootRef: ?Object,
  toggleOpen: Function
};

export class GlobalListeners extends Component<Props> {
  // define static properties
  static displayName = 'GlobalListeners';
  static defaultProps = {
    optionsIsOpen: false
  };

  componentWillReceiveProps(nextProps: Props) {
    const { optionsIsOpen } = this.props;

    // if Options is transferring from closed to open, add listeners
    // if Options is transferring from open to closed, remove listeners
    if (!optionsIsOpen && nextProps.optionsIsOpen) {
      addWindowListeners(this._getWindowListeners());
      addDocumentListeners(this._getDocumentListeners());
    } else if (optionsIsOpen && !nextProps.optionsIsOpen) {
      this._removeGlobalListeners();
    }
  }

  // before unmounting, remove all global listeners
  componentWillUnmount() {
    this._removeGlobalListeners();
  }

  // removes all event listeners from document and window
  _removeGlobalListeners() {
    removeDocumentListeners(this._getDocumentListeners());
    removeWindowListeners(this._getWindowListeners());
  }

  // removes all global listeners, then closes Options
  _removeListenersAndToggle = () => {
    const { optionsIsOpen, optionsRef } = this.props;
    this._removeGlobalListeners();

    // before toggle, ensure options is open and optionsRef exists on DOM
    if (!optionsIsOpen || !optionsRef || !optionsRef.current) { return; }
    this.props.toggleOpen();
  }

  _getDocumentListeners = () => ({
    click: this.handleDocumentClick,
    scroll: this.handleDocumentScroll
  });

  _getWindowListeners = () => ({
    resize: this.handleWindowResize
  });

  handleDocumentClick = (event: SyntheticMouseEvent<>) => {
    const { optionsIsOpen, rootRef } = this.props;

    // ensure Options is open
    if (!optionsIsOpen || !rootRef || !rootRef.current) { return; }

    // return early if the user clicked an element within the parent component
    // for example, the parent component could be Autocomplete or Select
    if (targetIsDescendant(event, rootRef.current)) { return; }

    // otherwise, remove all listeners and close Options
    this._removeListenersAndToggle();
  };

  handleWindowResize = () => this._removeListenersAndToggle();

  handleDocumentScroll = () => this._removeListenersAndToggle();

  render() {
    return <div>{this.props.children()}</div>;
  }
}
