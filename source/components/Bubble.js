// @flow
import React, { Component } from 'react';
import type { ComponentType, Element, ElementRef } from 'react';
import createRef from 'create-react-ref/lib/createRef';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';
import { addDocumentListeners, removeDocumentListeners } from '../utils/events';

// import constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

type Props = {
  className?: string,
  context: ThemeContextProp,
  isHidden: boolean,
  isFloating: boolean,
  isOpeningUpward: boolean,
  isTransparent: boolean,
  arrowRelativeToTip: boolean,
  skin?: ComponentType<any>,
  theme: ?Object, // takes precedence over them in context if passed
  themeId: string,
  themeOverrides: Object, // custom css/scss from user adhering to component's theme API
  targetRef?: ElementRef<*>, // ref to the target DOM element used for positioning the bubble
};

type State = {
  composedTheme: Object,
  position: ?Object
};

class BubbleBase extends Component<Props, State> {
  // declare ref types
  rootElement: ?Element<any>;

  // define static properties
  static displayName = 'Bubble';
  static defaultProps = {
    context: createEmptyContext(),
    isHidden: false,
    isFloating: false,
    isOpeningUpward: false,
    isTransparent: true,
    arrowRelativeToTip: false,
    theme: null,
    themeId: IDENTIFIERS.BUBBLE,
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    // define ref
    this.rootElement = createRef();

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

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  componentWillUpdate(nextProps) {
    const { isFloating } = this.props;
    // Add listeners when the bubble
    if (isFloating && !nextProps.isHidden && !this._hasEventListeners) {
      this._handleScrollEventListener('add');
      addDocumentListeners(this._getDocumentEvents());
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
      removeDocumentListeners(this._getDocumentEvents());
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
    const { isOpeningUpward, targetRef } = this.props;
    const { rootElement } = this;

    let target = targetRef && typeof targetRef !== 'string' ? targetRef.current : null;

    // Without a target, try to fallback to the parent node
    if (!target) {
      //  Only proceed if the root element is defined
      if (!rootElement || !rootElement.current) return;
      target = rootElement.current.parentElement;
    }

    const targetRect = target.getBoundingClientRect();

    let positionY;
    if (isOpeningUpward) {
      // Since we don't know the height of the bubble before rendering it we positioning
      // it with { bottom: XYpx } (within the viewport) and need this calculation:
      positionY = window.innerHeight - targetRect.top + 20;
    } else {
      positionY = targetRect.bottom + 20;
    }

    const position = {
      width: targetRect.width,
      positionX: targetRect.left,
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
      skin,
      theme,
      themeOverrides,
      context,
      ...rest
    } = this.props;

    const BubbleSkin = skin || context.skins[IDENTIFIERS.BUBBLE];

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

export const Bubble = withTheme(BubbleBase);
