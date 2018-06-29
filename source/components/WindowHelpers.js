// @flow
import React, { Component } from 'react';
import type { Ref } from 'react';

import {
  addEventsToDocument,
  removeEventsFromDocument,
  targetIsDescendant
} from '../utils';

type Props = {
  optionsIsOpen: boolean,
  optionsRef: Ref<any>,
  children: Function
};

type State = {
  optionsShouldClose: boolean
};

export class WindowHelpers extends Component<Props, State> {
  static defaultProps = {
    optionsIsOpen: false
  };

  state = {
    optionsShouldClose: false
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.optionsIsOpen && nextProps.optionsIsOpen) {
      window.addEventListener('resize', this._handleWindowResize);
      addEventsToDocument(this._getDocumentEvents());
    } else if (this.props.optionsIsOpen && !nextProps.optionsIsOpen) {
      this._removeAllEventListeners();
      this.setState({ optionsShouldClose: false });
    }
  }

  componentWillUnmount() {
    this._removeAllEventListeners();
  }

  _handleDocumentClick = (event: SyntheticMouseEvent<>) => {
    const { optionsRef, optionsIsOpen } = this.props;

    if (optionsRef && optionsRef.current) {
      const isDescendant = targetIsDescendant(event, optionsRef.current);

      if (optionsIsOpen && !isDescendant) {
        this.setState({ optionsShouldClose: true });
      }
    }
  };

  _handleWindowResize = () => {
    return this.props.optionsIsOpen && this.setState({ optionsShouldClose: true });
  };

  _handleScroll = () => {
    return this.props.optionsIsOpen && this.setState({ optionsShouldClose: true });
  };

  _removeAllEventListeners() {
    removeEventsFromDocument(this._getDocumentEvents());
    window.removeEventListener('resize', this._handleWindowResize);
  }

  _getDocumentEvents() {
    return {
      keydown: this._handleKeyDown,
      click: this._handleDocumentClick,
      scroll: this._handleScroll
    };
  }

  render() {
    const { optionsShouldClose } = this.state;

    return this.props.children({ optionsShouldClose });
  }
}
