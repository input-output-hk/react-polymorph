// @flow
import React, { Component } from 'react';
// $FlowFixMe
import type { SyntheticMouseEvent, ElementRef } from 'react';
import { debounce } from 'lodash';

import {
  addDocumentListeners,
  addWindowListeners,
  removeDocumentListeners,
  removeWindowListeners,
  targetIsDescendant
} from '../../utils/events';

type Props = {
  children: Function,
  mouseIsOverOptions: boolean,
  optionsIsOpen: boolean,
  optionsIsOpeningUpward: boolean,
  optionsRef?: ElementRef<*>,
  rootRef?: ElementRef<*>,
  toggleOpen: Function
};

type State = {
  optionsMaxHeight: number
};

export class GlobalListeners extends Component<Props, State> {
  // define static properties
  static displayName = 'GlobalListeners';
  static defaultProps = {
    optionsIsOpen: false
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      optionsMaxHeight: 300
    };
  }

  componentDidMount() {
    if (this.props.optionsIsOpen) { return; }
    // adds scroll and resize event listeners for calculating Options max-height
    this._addCalculateMaxHeightListeners();
    // runs initial Options max-height calculation
    this._calculateOptionsMaxHeight();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { optionsIsOpen } = this.props;

    // if Options is transferring from closed to open, add listeners
    // if Options is transferring from open to closed, remove listeners
    if (!optionsIsOpen && nextProps.optionsIsOpen) {
      // first remove max-height calc handler on scroll and resize
      // then add toggle handler on scroll and resize
      this._removeGlobalListeners();
      addWindowListeners(this._getWindowListeners());
      addDocumentListeners(this._getDocumentListeners());

    } else if (optionsIsOpen && !nextProps.optionsIsOpen) {
      // remove toggle handler on scroll and resize
      // then add calc max-height calc handler on scroll and resize
      this._removeGlobalListeners();
      this._addCalculateMaxHeightListeners();
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
    click: this._handleDocumentClick,
    scroll: this._handleDocumentScroll
  });

  _getWindowListeners = () => ({
    resize: this._handleWindowResize
  });

  _handleDocumentClick = (event: SyntheticMouseEvent<>) => {
    const { optionsIsOpen, rootRef } = this.props;

    // ensure Options is open
    if (!optionsIsOpen || !rootRef || !rootRef.current) { return; }

    // return early if the user clicked an element within the parent component
    // for example, the parent component could be Autocomplete or Select
    if (targetIsDescendant(event, rootRef.current)) { return; }

    // otherwise, remove all listeners and close Options
    this._removeListenersAndToggle();
  };

  _handleWindowResize = () => this._removeListenersAndToggle();

  _handleDocumentScroll = () => this._removeListenersAndToggle();

  _addCalculateMaxHeightListeners = () => {
    const scrollListener = ['scroll', debounce(this._calculateOptionsMaxHeight, 300, { leading: true }), true];
    const resizeListener = ['resize', debounce(this._calculateOptionsMaxHeight, 300)];
    document.addEventListener(...scrollListener);
    window.addEventListener(...resizeListener);
  }

  // calculates max-height for Options, max-height shouldn't be greater than distance
  // from Options rootRef to edge of window (up or down) else Options run off page
  _calculateOptionsMaxHeight = () => {
    const { documentElement } = document;
    const {
      rootRef,
      optionsIsOpeningUpward,
      optionsIsOpen,
      toggleOpen,
      mouseIsOverOptions,
    } = this.props;

    // checks if Options are open & being scrolled upon via mouse position prior to toggling closed
    optionsIsOpen && !mouseIsOverOptions && toggleOpen();

    if (!documentElement || !documentElement.style || !rootRef || !rootRef.current) {
      return;
    }

    const { height, top } = rootRef.current.getBoundingClientRect();
    // opening upwards case
    if (optionsIsOpeningUpward && top < window.innerHeight) {
      this.setState({ optionsMaxHeight: top - 20 });
      return;
    }

    // opening downwards case
    const optionsMaxHeight = window.innerHeight - top - height - 30;
    if (!optionsIsOpeningUpward && optionsMaxHeight > 0) {
      this.setState({ optionsMaxHeight });
    }
  }

  render() {
    const { optionsMaxHeight } = this.state;
    return <div>{this.props.children({ optionsMaxHeight })}</div>;
  }
}
