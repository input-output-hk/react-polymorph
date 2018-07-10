// @flow
import React from 'react';
import type { Ref } from 'react';

// external libraries
import SVGInline from 'react-svg-inline';
import classnames from 'classnames';

// internal assets
import spinnerIconBig from '../../themes/simple/assets/spinner-big.inline.svg';
import spinnerIconSmall from '../../themes/simple/assets/spinner-small.inline.svg';

type Props = {
  big: boolean,
  className: string,
  rootRef: Ref<*>,
  theme: Object,
  themeId: string
};

export const LoadingSpinnerSkin = (props: Props) => {
  const { big, rootRef, className, themeId } = props;
  const theme = props.theme[themeId];
  const icon = big ? spinnerIconBig : spinnerIconSmall;
  const sizeStyle = big ? theme.big : theme.small;

  return (
    <div ref={rootRef} className={classnames([className, theme.root, sizeStyle])}>
      <SVGInline svg={icon} className={theme.icon} />
    </div>
  );
};
