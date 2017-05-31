# react-polymorph

React Polymorph is a UI framework for React, that separates logic, markup and theming of components. 
It's powered by [CSS Modules](https://github.com/css-modules/css-modules) and harmoniously integrates with 
your [webpack](http://webpack.github.io/) workflow, although you can use any other module bundler.

## Why?

- Existing React UI frameworks are too hard to customize.
- Overriding css styles is not enough for complex components.
- You need multiple variations of a component with shared logic.
- You need multiple, completely unique themes for your components. 

## How:

Separate monolithic React components into:

1. **Component** (logic) - Only handle UI logic, do not render markup.
2. **Skin** (markup) - Only render the markup, delegate to component.
3. **Theme** (styling) - Only concerned about styling your skin.
 
### Basic Example

You need standard `Input` components for text and a `NumericInput` for floating 
point numbers. The only difference is the logic of the component, in both cases
it is "just" an input field showing some text:

#### Standard Input

The standard input is as simple as possible and does not much logic.

```javascript
import React from 'react';
import Input from 'react-polymorph/lib/components/Input';
import InputSkin from 'react-polymorph/lib/skins/simple/InputSkin';

// Standard input component:
const MyStandardInput = (props) => (
  <Input 
    skin={InputSkin}
    label="Input with max. 5 Characters"
    maxLength={5}
  />
);
```

![Standard Input](./docs/images/react-polymorph-input-example.png)

#### Numeric Input

The numeric input however is heavily specialized in guiding the user to 
enter correct floating point numbers.

```javascript
import React from 'react';
import NumericInput from 'react-polymorph/lib/components/NumericInput';
import InputSkin from 'react-polymorph/lib/skins/simple/InputSkin';

const MyNumericInput = (props) => (
  <NumericInput
    skin={InputSkin}
    label="Amount"
    placeholder="0.000000"
    maxBeforeDot={5}
    maxAfterDot={6}
    maxValue={30000}
    minValue={0.000001}
  />
);
```

![Standard Input](./docs/images/react-polymorph-numeric-input-example.png)

This is a simple example that shows how you can make/use specialized versions
of basic components by composition - a core idea of `react-polymorph`!

_more documentation coming soon …_
