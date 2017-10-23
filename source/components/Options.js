import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import SkinnableComponent from './SkinnableComponent';
import events from '../utils/events';

export default class Options extends SkinnableComponent {

  static SKIN_PARTS = {
    OPTIONS: 'options',
  };

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    isOpen: PropTypes.bool,
    isOpeningUpward: PropTypes.bool,
    resetOnClose: PropTypes.bool, // reset highlighted option on options close (e.g. in autocomplete)
    optionRenderer: PropTypes.func,
    selectedOptionValue: PropTypes.string,
    noResults: PropTypes.bool,
  });

  static defaultProps = {
    isOpen: false,
    isOpeningUpward: false,
    resetOnClose: false,
  };

  state = {
    isOpen: this.props.isOpen,
    highlightedOptionIndex: 0,
    position: null,
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.isOpen !== nextProps.isOpen ) {
      this.updateComponentsStates(nextProps.isOpen, null);
    }
  }

  componentWillUpdate (nextProps, nextState) {
    // update isOpen state when parent component force open / close options
    // (e.g. click on Input in Select component)
    if (!this.state.isOpen && nextState.isOpen) {
      window.addEventListener("resize", this._handleWindowResize);
      this.handleScrollEventListener('add');
      events.addEventsToDocument(this._getDocumentEvents());
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.isOpen && !this.state.isOpen) {
      this.handleScrollEventListener('remove');
      events.removeEventsFromDocument(this._getDocumentEvents());
      window.removeEventListener("resize", this._handleWindowResize);
    }

    if (this.props.isOpen !== prevProps.isOpen ) {
      const rootNode = this._getRootSkinPart();
      const parentNode = this._getRootSkinPart().parentNode;
      const rootNodeParams = rootNode.getBoundingClientRect();
      const parentNodeParams = parentNode.getBoundingClientRect();

      let positionY;
      if (this.props.isOpeningUpward) {
        positionY = parentNodeParams.bottom - parentNodeParams.height - rootNodeParams.height + 20;
      } else {
        positionY = parentNodeParams.bottom + 20;
      }

      const position = {
        width: parentNodeParams.width,
        positionX: parentNodeParams.left,
        positionY,
      };
      this.updateComponentsStates(this.props.isOpen, position);
    }
  }

  componentWillUnmount () {
    if (this.state.isOpen) {
      events.removeEventsFromDocument(this._getDocumentEvents());
      window.removeEventListener("resize", this._handleWindowResize);
      this.handleScrollEventListener('remove');
    }
  }

  prepareSkinProps (props) {
    return Object.assign({}, super.prepareSkinProps(props), {
      isOpen: this.state.isOpen,
      highlightedOptionIndex: this.state.highlightedOptionIndex,
      position: this.state.position,
    });
  };

  updateComponentsStates = (isOpen, position) => {
    this.setState({ isOpen, position });
  };

  getFirstScrollableParent = (node) => {
    if (node == null) return null;
    if (node.scrollHeight > node.clientHeight) {
      return node;
    } else {
      return this.getFirstScrollableParent(node.parentNode);
    }
  };

  handleScrollEventListener = (action) => {
    const rootNode = this._getRootSkinPart();
    const scrollableNode = this.getFirstScrollableParent(rootNode);
    if (scrollableNode) {
      if (action === 'add') {
        scrollableNode.addEventListener('scroll', this._handleScroll);
      } else if (action === 'remove') {
        scrollableNode.addEventListener('scroll', this._handleScroll);
      }
    }
  };

  open = () => {
    this.setState({
      isOpen: true,
      highlightedOptionIndex: this.props.resetOnClose ? 0 : this.state.highlightedOptionIndex,
    });
  };

  close = () => {
    if (this.props.onClose) this.props.onClose();
    this.setState({
      position: null,
      highlightedOptionIndex: this.props.resetOnClose ? 0 : this.state.highlightedOptionIndex,
    });
  };

  getHighlightedOptionIndex = () => {
    // If nothing is higlighted, highlight selected option
    // In case nothing is selected, highlight first option
    const { options, isOpeningUpward } = this.props;
    const currentIndex = this.state.highlightedOptionIndex;
    let index = 0;
    if (currentIndex !== null) {
      index = currentIndex;
    } else if (this.props.selectedOptionValue) {
      index = options.findIndex(option => option.value === this.props.selectedOptionValue);
    }
    if (isOpeningUpward) return options.length - 1 - index;
    return index;
  };

  setHighlightedOptionIndex = (optionIndex) => {
    if (!this.isHighlightedOption(optionIndex) && this.isDisabledOption(optionIndex)) {
      this.setState({ highlightedOptionIndex: optionIndex });
    }
  };

  isHighlightedOption = (optionIndex) => {
    return this.state.highlightedOptionIndex === optionIndex;
  };

  isDisabledOption = (optionIndex) => {
    const { options } = this.props;
    const option = options[optionIndex];
    return option && !option.isDisabled;
  };

  handleClickOnOption = (option, event) => {
    if (option) {
      if (option.isDisabled) return;
      if (this.props.onChange) this.props.onChange(option, event);
    }
    if (this.props.onBlur) this.props.onBlur(event);
    this.close();
  };

  // ========= PRIVATE HELPERS =========

  _handleSelectionOnEnterKey = (event) => {
    const { options, isOpeningUpward } = this.props;
    const currentIndex = this.state.highlightedOptionIndex;
    const reverseIndex = options.length - 1 - currentIndex;
    const highlightedOption = options[isOpeningUpward ? reverseIndex : currentIndex];
    this.handleClickOnOption(highlightedOption, event);
  };

  _handleHighlightMove = (currentIndex, direction) => {
    const { options } = this.props;
    const lowerIndexBound = 0;
    const upperIndexBound = options.length - 1;
    let newIndex = (direction === 'up') ? (currentIndex - 1) : (currentIndex + 1);

    // Make sure new index is within options bounds
    newIndex = Math.max(lowerIndexBound, Math.min(newIndex, upperIndexBound));

    if (options[newIndex].isDisabled) {
      // Try to jump over disabled options
      const canMoveUp = newIndex > lowerIndexBound;
      const canMoveDown = newIndex < upperIndexBound;
      if ((direction === 'up' && canMoveUp) || (direction === 'down' && canMoveDown)) {
        this._handleHighlightMove(newIndex, direction);
      }
    } else {
      this.setHighlightedOptionIndex(newIndex);
    }
  };

  _handleKeyDown = (event) => {
    const highlightOptionIndex = this.state.highlightedOptionIndex;
    switch (event.keyCode) {
      case 9: // Select currently highlighted option on Tab key
      event.preventDefault();
        this._handleSelectionOnEnterKey(event);
        break;
      case 13: // Select currently highlighted option on Enter key
        this._handleSelectionOnEnterKey(event);
        break;
      case 27: // Close on Escape key
        this.close();
        break;
      case 38: // Move selection higlight 'up' on Arrow Up key
        event.preventDefault(); // prevent caret move
        this._handleHighlightMove(highlightOptionIndex, 'up');
        break;
      case 40: // Move selection higlight 'down' on Arrow Down key
        event.preventDefault(); // prevent caret move
        this._handleHighlightMove(highlightOptionIndex, 'down');
        break;
    }
  };

  _handleDocumentClick = (event) => {
    const root = this._getRootSkinPart();
    const isDescendant = events.targetIsDescendant(event, ReactDOM.findDOMNode(root));
    if (this.state.isOpen && !isDescendant) {
      this.close();
    }
  };

  _handleWindowResize = () => this.state.isOpen && this.close();

  _handleScroll = () => this.state.isOpen && this.close();

  _getDocumentEvents () {
    return {
      keydown: this._handleKeyDown,
      click: this._handleDocumentClick,
      touchend: this._handleDocumentClick,
      scroll: this._handleScroll,
    };
  }

  _getRootSkinPart () {
    return this.skinParts[Options.SKIN_PARTS.OPTIONS];
  }
}
