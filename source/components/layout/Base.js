// @flow
import React, { Component } from 'react';
import classnames from 'classnames';

// styles
import baseStyles from '../../themes/simple/layout/Base.scss';

// utilities
import { composeBaseStyles } from '../../utils/themes';

type Props = {
  activeClasses: Array<''>,
  children: Element<*>,
  className: string,
  stylesToAdd: Object
};

type State = {
  composedStyles: Object
};

export class Base extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { activeClasses, stylesToAdd } = props;

    this.state = {
      composedStyles: composeBaseStyles(baseStyles, stylesToAdd, activeClasses)
    };
  }

  render() {
    const { className, children } = this.props;
    const { composedStyles } = this.state;

    return (
      <div className={classnames([className, composedStyles.base])}>
        {children}
      </div>
    );
  }
}
