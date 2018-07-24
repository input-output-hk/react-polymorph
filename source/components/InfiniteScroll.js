// @flow
import React, { Component } from 'react';
// $FlowFixMe
import createRef from 'create-react-ref/lib/createRef';

// import helper styles
import styles from '../themes/simple/SimpleInfiniteScroll.scss';

type Props = {
  fetchData: Function,
  renderItems: Function
};

type State = {
  data: Object | Array,
  error: string | Element<*>,
  isLoading: boolean,
  hasMoreData: boolean
};

export class InfiniteScroll extends Component<Props, State> {
  scrollContainer: ?Element<'div'>;

  static defaultProps = {
    fetchData() {}
  };

  constructor(props: Props) {
    super(props);
    this.scrollContainer = createRef();
    this.state = {
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
    const { scrollContainer } = this;
    const { offsetHeight, scrollTop, scrollHeight } = scrollContainer.current;
    // can also substract height of item from scroll height to load data before the absolute end
    if (offsetHeight + scrollTop >= scrollHeight) {
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
    const { renderItems } = this.props;
    const { scrollContainer, _isFunction, state } = this;

    if (!_isFunction(renderItems)) { return null; }
    return (
      <div ref={scrollContainer} className={styles.root}>
        {renderItems({ ...state, scrollContainer })}
      </div>
    );
  }
}
