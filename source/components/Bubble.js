// @flow
import React, { Component } from 'react';
import type { ComponentType, Element, ElementRef } from 'react';

// internal utility functions
import { withTheme } from '../themes/withTheme';
import {
  addEventsToDocument,
  removeEventsFromDocument,
  composeTheme,
  addThemeId
} from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  isHidden: boolean,
  isFloating: boolean,
  isOpeningUpward: boolean,
  isTransparent: boolean,
  skin: ComponentType<any>,
  theme: Object, // takes precedence over them in context if passed
  themeId: string,
  themeOverrides: Object // custom css/scss from user adhering to component's theme API
};

type State = {
  composedTheme: Object,
  position: ?Object
};

class Bubble extends Component<Props, State> {
  rootElement: ?Element<any>;

  static defaultProps = {
    isHidden: false,
    isFloating: false,
    isOpeningUpward: false,
    isTransparent: true,
    theme: null,
    themeId: IDENTIFIERS.BUBBLE,
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    // $FlowFixMe
    this.rootElement = React.createRef();

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      position: null
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

  _handleScrollEventListener = (action: string) => {
    // const rootNode = this.rootElement;
    const { rootElement } = this;
    if (rootElement) {
      const scrollableNode = this._getFirstScrollableParent(rootElement);
      if (scrollableNode) {
        if (action === 'add') {
          scrollableNode.addEventListener('scroll', this._updatePosition);
        } else if (action === 'remove') {
          scrollableNode.removeEventListener('scroll', this._updatePosition);
        }
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

  _getFirstScrollableParent = (element: ElementRef<*>) => {
    if (element == null) return null;
    const { rootElement } = this;
    const node = {}.hasOwnProperty.call(element, 'current') ? element.current : element;

    if (rootElement) {
      if (node === rootElement.current || node.scrollHeight <= node.clientHeight) {
        return this._getFirstScrollableParent(node.parentElement);
      }
    }

    return node;
  };

  _updatePosition = () => {
    const { isOpeningUpward } = this.props;
    const { rootElement } = this;

    if (rootElement) {
      const parentNode = rootElement.current ? rootElement.current.parentElement : null;
      const parentNodeParams = parentNode
        ? parentNode.getBoundingClientRect()
        : null;

      if (parentNodeParams !== null) {
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
      }
    }
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
      context,
      ...rest
    } = this.props;

    return (
      <BubbleSkin
        rootRef={this.rootElement}
        position={this.state.position}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export default withTheme(Bubble);
