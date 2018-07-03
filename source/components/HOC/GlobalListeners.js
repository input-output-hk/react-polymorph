// @flow
import React, { Component } from 'react';
import type { Ref, SyntheticMouseEvent } from 'react';

import {
  addEventsToDocument,
  addEventsToWindow,
  removeEventsFromDocument,
  removeEventsFromWindow,
  targetIsDescendant
} from '../../utils';

type Props = {
  children: Function,
  optionsIsOpen: boolean,
  optionsRef: Ref<any>,
  toggleOpen: Function
};

export class GlobalListeners extends Component<Props> {
  static defaultProps = {
    optionsIsOpen: false
  };

  componentWillReceiveProps(nextProps) {
    // check if optionsIsOpen is transferring from false to true
    if (!this.props.optionsIsOpen && nextProps.optionsIsOpen) {

      // add all event listeners to window
      addEventsToWindow(this._getWindowEvents());
      // add all event listeners to document
      addEventsToDocument(this._getDocumentEvents());
    }
  }

  componentWillUnmount() {
    // when WindowHelpers unmounts, clear all event listeners from window and document
    this._clearWindowAndDocument();
  }

  _removeAllEventsAndCloseOptions = () => {
    const { optionsIsOpen, toggleOpen } = this.props;
    // if Select is not currently rendering Options, return early
    if (!optionsIsOpen) { return; }

    // otherwise remove all event handlers from document and window
    // and close Options using Select's toggleOpen method
    this._clearWindowAndDocument();
    toggleOpen();
  }

  _clearWindowAndDocument() {
    removeEventsFromDocument(this._getDocumentEvents());
    removeEventsFromWindow(this._getWindowEvents());
  }

  _getDocumentEvents() {
    return {
      click: this.handleDocumentClick,
      scroll: this.handleDocumentScroll
    };
  }

  _getWindowEvents() {
    return {
      resize: this.handleWindowResize
    };
  }

  handleDocumentClick = (event: SyntheticMouseEvent<>) => {
    const { optionsRef } = this.props;

    // check for valid Options ref currently on DOM
    if (!optionsRef || !optionsRef.current) { return; }

    // check if user has clicked a DOM element within Options
    const isDescendant = targetIsDescendant(event, optionsRef.current);

    // return early
    if (isDescendant) { return; }

    // user has clicked outside of Options component
    // remove all event listeners from document & window, close Options component
    this._removeAllEventsAndCloseOptions();
  };

  handleWindowResize = () => this._removeAllEventsAndCloseOptions();

  handleDocumentScroll = () => this._removeAllEventsAndCloseOptions();

  render() {
    return this.props.children();
  }
}
