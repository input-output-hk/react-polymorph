// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// $FlowFixMe
import createRef from 'create-react-ref/lib/createRef';

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
  error: boolean | string | Element<*>,
  hasMoreData: boolean,
  isLoading: boolean
};

class InfiniteScrollBase extends Component<Props, State> {
  // declare ref types
  scrollContainer: ?Element<any>;

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
    this.handleFetchData();
  }

  componentDidMount() {
    const { scrollContainer } = this;
    scrollContainer.current.addEventListener('scroll', this.handleScroll);
  }

  _isFunction = (renderProp: ?Function) => (renderProp && typeof renderProp === 'function');

  setError = (error: string | Element<*>) => this.setState({ error });

  handleFetchData = () => this.props.fetchData(this.setState.bind(this));

  checkForScrollBottom = () => {
    const { scrollContainer, props: { threshold } } = this;
    const { offsetHeight, scrollTop, scrollHeight } = scrollContainer.current;

    if (offsetHeight + scrollTop >= scrollHeight - threshold) {
      return this.handleFetchData();
    }
  };

  handleScroll = () => {
    const { error, isLoading, hasMoreData } = this.state;

    // return early for error, loading, or lack of future data
    if (error || isLoading || !hasMoreData) { return; }
    return this.checkForScrollBottom();
  };

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
