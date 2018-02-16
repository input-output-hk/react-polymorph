import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';
import events from '../utils/events';

export default class Bubble extends SkinnableComponent {

  static SKIN_PARTS = {
    ROOT: 'root',
    BUBBLE: 'bubble',
  };

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    isOpeningUpward: PropTypes.bool,
    isTransparent: PropTypes.bool,
    isFloating: PropTypes.bool,
    isHidden: PropTypes.bool,
  });

  static defaultProps = {
    isOpeningUpward: false,
    isTransparent: true,
    isFloating: false,
    isHidden: false,
  };

  state = {
    position: null,
  };

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
      events.addEventsToDocument(this._getDocumentEvents());
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

  prepareSkinProps(props) {
    return Object.assign({}, super.prepareSkinProps(props), {
      position: this.state.position,
    });
  };

  // =========== PRIVATE HELPERS ==============

  _handleScrollEventListener = (action) => {
    const rootNode = this._getRootSkinPart();
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
      events.removeEventsFromDocument(this._getDocumentEvents());
      this._handleScrollEventListener('remove');
      window.removeEventListener('resize', this._updatePosition);
      this._hasEventListeners = false;
    }
  }

  _getFirstScrollableParent = (node) => {
    if (node == null) return null;
    if (node === this._getRootSkinPart() || node.scrollHeight <= node.clientHeight) {
      return this._getFirstScrollableParent(node.parentNode);
    } else {
      return node;
    }
  };

  _getRootSkinPart() {
    return this.skinParts[Bubble.SKIN_PARTS.ROOT];
  }

  _updatePosition = () => {
    const { isOpeningUpward } = this.props;
    const rootNode = this._getRootSkinPart();
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
      positionY,
    };
    this.setState({ position });
  };

  _getDocumentEvents() {
    return {
      resize: this._updatePosition,
      scroll: this._updatePosition
    };
  }

}
