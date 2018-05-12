import React from 'react';
import { context } from './context';

export const ContextProvider = props => props.children(context);
