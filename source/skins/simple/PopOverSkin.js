// @flow
import Tippy from '@tippyjs/react';
import { isString } from 'lodash';
import classnames from 'classnames';
import Popper from 'popper.js';
import React, { forwardRef, Node, useState } from 'react';
import type { PopOverProps } from '../../components/PopOver';

const PopOverWrapper = forwardRef(
  (
    props: {
      children?: ?Node,
      className?: string,
      onMouseEnter: () => void,
      onMouseLeave: () => void,
    },
    ref
  ) => {
    return (
      <span
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        className={props.className}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex="0"
        ref={ref}
      >
        {props.children}
      </span>
    );
  }
);

export function PopOverSkin(props: PopOverProps) {
  const {
    allowHTML,
    children,
    content,
    contentClassName,
    isShowingOnHover,
    isVisible,
    popperOptions,
    theme,
    themeId,
    themeOverrides,
    themeVariables,
    ...tippyProps
  } = props;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Tippy
      offset={[0, 14]}
      {...tippyProps}
      visible={isVisible || (isShowingOnHover && isHovered)}
      content={
        isString(content) && allowHTML ? (
          <span dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          content
        )
      }
      className={classnames([theme[themeId].root])}
      theme="polymorph"
      plugins={[
        {
          // Makes it possible to pass themeVariables props to PopOvers
          name: 'cssVariables',
          defaultValue: {},
          fn(instance: Popper) {
            return {
              onAfterUpdate() {
                const { cssVariables } = instance.props;
                Object.keys(cssVariables).forEach((key) => {
                  instance.popper.style.setProperty(key, cssVariables[key]);
                });
              },
            };
          },
        },
      ]}
      popperOptions={{
        ...popperOptions,
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              // Necessary to avoid sub-pixel rendering issues with arrows
              gpuAcceleration: false, // true by default
            },
          },
          {
            name: 'preventOverflow',
            options: {
              // Keep a 4px distance from the viewport edges
              padding: 4,
            },
          },
        ].concat(popperOptions.modifiers ?? []),
      }}
      cssVariables={themeVariables}
    >
      <PopOverWrapper
        className={contentClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </PopOverWrapper>
    </Tippy>
  );
}
