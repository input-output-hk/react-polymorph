// @flow
import React, { useEffect } from 'react';

export type ThemeVariables = { [index: string]: string };

type ThemeVariablesProps = {
  children: Node,
  isRoot?: boolean,
  variables: ThemeVariables,
};

export function ThemeVariablesProvider(props: ThemeVariablesProps) {
  const { isRoot, variables } = props;
  useEffect(() => {
    if (isRoot) {
      // Set css variables on document root
      Object.keys(variables).forEach((key) => {
        document.documentElement.style.setProperty(key, variables[key]);
      });
    }
  });
  return <div style={isRoot ? {} : props.variables}>{props.children}</div>;
}
