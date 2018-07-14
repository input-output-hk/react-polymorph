// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import styles from '../../themes/layout/Base.scss';
import { composeComponentStyles } from '../../utils/themes';

type Props = {
  enhancements: Object,
  children: Element<*>
};

type State = {
  composedStyles: Object
};

export class Base extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { enhancements } = props;

    this.state = {
      composedStyles: composeComponentStyles(styles, enhancements)
    };
  }

  render() {
    const { children } = this.props;
    const { composedStyles } = this.state;

    return (
      <div className={classnames([...Object.values(composedStyles)])}>
        {children}
      </div>
    );
  }
}
