// @flow
import React from 'react';

type ThemeVariablesProps = {
  children: Node,
  vars: { [index: string]: string },
};

export function ThemeVariables(props: ThemeVariablesProps) {
  return <div style={props.vars}>{props.children}</div>;
}
