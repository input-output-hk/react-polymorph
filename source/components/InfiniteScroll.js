// @flow
import React, { Component } from 'react';
import type { ComponentType, Node } from 'react';
// $FlowFixMe
import createRef from 'create-react-ref/lib/createRef';
import { isEqual } from 'lodash';

import type { ReactElementRef } from '../utils/types.js';

// internal components
import { withTheme } from './HOC/withTheme';

// utilities
import { composeTheme, addThemeId } from '../utils/themes';

// constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  fetchData: Function,
  renderItems: Function,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object,
  threshold: number
};

type State = {
  composedTheme: Object,
  data: Object | Array<{}>,
  error: boolean | string | Node,
  hasMoreData: boolean,
  isLoading: boolean
};

class InfiniteScrollBase extends Component<Props, State> {
  // declare ref types
  scrollContainer: ReactElementRef<typeof HTMLElement>;

  // define static properties
  static displayName = 'InfiniteScroll';
  static defaultProps = {
    fetchData() {},
    theme: null,
    themeId: IDENTIFIERS.INFINITE_SCROLL,
    themeOverrides: {},
    threshold: 250
  };

  constructor(props: Props) {
    super(props);
    const { context, themeId, theme, themeOverrides } = props;

    // refs
    this.scrollContainer = createRef();

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      data: [],
      error: false,
      isLoading: false,
      hasMoreData: true
    };
  }

  componentWillMount() {
    this._handleFetchData();
  }

  componentDidMount() {
    const { scrollContainer } = this;
    if (!scrollContainer.current) return;
    scrollContainer.current.addEventListener('scroll', this._handleScroll);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { context, themeId, theme, themeOverrides } = this.props;
    const {
      context: nextContext,
      themeId: nextThemeId,
      theme: nextTheme,
      themeOverrides: nextOverrides
    } = nextProps;

    if (
      !isEqual(context, nextContext) ||
      !isEqual(themeId, nextThemeId) ||
      !isEqual(theme, nextTheme) ||
      !isEqual(themeOverrides, nextOverrides)
    ) {
      this.setState(() => ({
        composedTheme: composeTheme(
          addThemeId(nextTheme || nextContext.theme, nextThemeId),
          addThemeId(nextOverrides, nextThemeId),
          nextContext.ROOT_THEME_API
        )
      }));
    }
  }

  // calls user's fetchData function from props
  _handleFetchData = () => this.props.fetchData(this.setState.bind(this))

  // scroll event listener attached to scrollContainer element
  _handleScroll = () => {
    const { error, isLoading, hasMoreData } = this.state;

    // return early for error, loading, or lack of future data
    if (error || isLoading || !hasMoreData) { return; }
    return this._checkForScrollBottom();
  }

  // prevents new data fetch until user has scrolled near bottom of existing data
  _checkForScrollBottom = () => {
    const { scrollContainer, props: { threshold } } = this;
    if (!scrollContainer.current) return;
    const { offsetHeight, scrollTop, scrollHeight } = scrollContainer.current;

    if (offsetHeight + scrollTop >= scrollHeight - threshold) {
      return this._handleFetchData();
    }
  }

  _isFunction = (renderProp: ?Function) => (renderProp && typeof renderProp === 'function')

  render() {
    const {
      props: {
        className,
        renderItems,
        skin: InfiniteScrollSkin,
        themeId
      },
      state: {
        composedTheme,
        data,
        error,
        hasMoreData,
        isLoading
      },
      scrollContainer
    } = this;

    if (!this._isFunction(renderItems)) { return null; }

    return (
      <InfiniteScrollSkin
        className={className}
        data={data}
        error={error}
        hasMoreData={hasMoreData}
        isLoading={isLoading}
        renderItems={renderItems}
        scrollContainerRef={scrollContainer}
        theme={composedTheme}
        themeId={themeId}
      />
    );
  }
}

export const InfiniteScroll = withTheme(InfiniteScrollBase);
