import React, { Component } from 'react';
import { string, bool, func, object } from 'prop-types';
import { addEventsToDocument, pickTheme, removeEventsFromDocument } from '../utils';

// Bubble theme API
import THEME_API, { IDENTIFIERS } from '../themes/API';

// internal utility functions
import { StringOrElement, composeTheme } from '../utils';

class Bubble extends Component {
  static propTypes = {
    isHidden: bool,
    isFloating: bool,
    isOpeningUpward: bool,
    isTransparent: bool,
    skin: func.isRequired,
    theme: object,
    themeId: string,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    isHidden: false,
    isFloating: false,
    isOpeningUpward: false,
    isTransparent: true,
    theme: null,
    themeId: IDENTIFIERS.BUBBLE,
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    this.state = {
      position: null,
      composedTheme: composeTheme(props.theme || context.theme, props.themeOverrides, THEME_API)
    };
  }

  _hasEventListeners = false;

  componentDidMount() {
    setTimeout(() => {
      if (this.props.isFloating) this._updatePosition();
    }, 0);
  }

  componentWillUpdate(nextProps) {
    const { isFloating } = this.props;
    // Add listeners when the bubble
    if (isFloating && !nextProps.isHidden && !this._hasEventListeners) {
      this._handleScrollEventListener('add');
      addEventsToDocument(this._getDocumentEvents());
      window.addEventListener('resize', this._updatePosition);
      this._hasEventListeners = true;
    }
  }

  componentDidUpdate(prevProps) {
    const { isHidden } = this.props;
    const didVisibilityChange = isHidden !== prevProps.isHidden;
    const wasBubbleHidden = !prevProps.isHidden && isHidden;

    if (wasBubbleHidden) this._removeAllEventListeners();
    if (didVisibilityChange) this._updatePosition();
  }

  componentWillUnmount() {
    if (this._hasEventListeners) this._removeAllEventListeners();
  }

  // =========== PRIVATE HELPERS ==============

  _handleScrollEventListener = action => {
    const rootNode = this.rootElement;
    const scrollableNode = this._getFirstScrollableParent(rootNode);
    if (scrollableNode) {
      if (action === 'add') {
        scrollableNode.addEventListener('scroll', this._updatePosition);
      } else if (action === 'remove') {
        scrollableNode.removeEventListener('scroll', this._updatePosition);
      }
    }
  };

  _removeAllEventListeners() {
    if (this._hasEventListeners) {
      removeEventsFromDocument(this._getDocumentEvents());
      this._handleScrollEventListener('remove');
      window.removeEventListener('resize', this._updatePosition);
      this._hasEventListeners = false;
    }
  }

  _getFirstScrollableParent = node => {
    if (node == null) return null;
    if (node === this.rootElement || node.scrollHeight <= node.clientHeight) {
      return this._getFirstScrollableParent(node.parentNode);
    } else {
      return node;
    }
  };

  _updatePosition = () => {
    const { isOpeningUpward } = this.props;
    const rootNode = this.rootElement;
    const parentNode = rootNode.parentNode;
    const parentNodeParams = parentNode.getBoundingClientRect();

    let positionY;
    if (isOpeningUpward) {
      positionY = window.innerHeight - parentNodeParams.top + 20;
    } else {
      positionY = parentNodeParams.bottom + 20;
    }

    const position = {
      width: parentNodeParams.width,
      positionX: parentNodeParams.left,
      positionY
    };
    this.setState({ position });
  };

  _getDocumentEvents() {
    return {
      resize: this._updatePosition,
      scroll: this._updatePosition
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: BubbleSkin,
      theme,
      themeOverrides,
      ...rest
    } = this.props;

    return (
      <BubbleSkin
        rootRef={el => (this.rootElement = el)}
        position={this.state.position}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export default Bubble;
