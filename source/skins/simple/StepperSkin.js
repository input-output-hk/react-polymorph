// @flow
import React from 'react';

// external libraries
import { map } from 'lodash';
import classnames from 'classnames';

type Props = {
  className: string,
  label?: string,
  labelDisabled?: boolean,
  steps: Array<string>,
  activeStep?: number,
  theme: Object,
  themeId: string,
  onStepClick?: Function,
};

export const StepperSkin = (props: Props) => {
  let label;
  if (!props.steps) return null;

  if (!props.labelDisabled) {
    const calculatedLabel = props.activeStep && `STEP ${props.activeStep} OF ${props.steps.length}`;
    label = props.label ? props.label : calculatedLabel;
  }

  return (
    <div
      role="presentation"
      aria-hidden
      className={classnames([
        props.className,
        props.theme[props.themeId].root,
      ])}
    >
      <div className={props.theme[props.themeId].wrapper}>
        {label && (
          <div
            className={props.theme[props.themeId].label}
          >
            <h3>{label}</h3>
          </div>
        )}
        <ul className={props.theme[props.themeId].stepsWrapper}>
          {map(props.steps, (step, index) => {
            let classname;
            if ((index + 1) < props.activeStep) {
              classname = 'finished';
            } else if ((index + 1) === props.activeStep) {
              classname = 'active';
            } else {
              classname = 'disabled';
            }

            return (
              <li
                key={index}
                className={props.theme[props.themeId][classname]}
                style={{ width: `${100 / props.steps.length}%` }}
                role="presentation"
                aria-hidden
                onClick={event => {
                  if (props.onStepClick) {
                    props.onStepClick(index, event);
                  }
                }}
              >
                {step}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
