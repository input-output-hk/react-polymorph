# react-polymorph

React Polymorph is a simple UI framework for React, that separates logic, markup and theming of components. 
It's powered by [CSS Modules](https://github.com/css-modules/css-modules) and harmoniously integrates with 
your [webpack](http://webpack.github.io/) workflow, although you can use any other module bundler.

## Why?

- Existing React UI frameworks are too hard to customize.
- Overriding css styles is not enough for complex components.
- You need multiple variations of a component with shared logic.
- You need multiple, completely unique themes for your components. 

## The Solution

Separate monolithic React components into:

1. **Component** (logic) - Only handle UI logic, do not render markup.
2. **Skin** (markup) - Only render the markup, delegate to component.
3. **Theme** (styling) - Only concerned about styling your skin.
 
### Simple Example

You already use a textarea component but need an advanced version with rich text editing toolbar in some cases … 
however you also want to re-use the auto-resizing logic that is provided by the react-polymorph `Textarea` component:

`ExampleTextEditor.js`
```javascript
import TextArea from 'react-polymorph/lib/components/TextArea';
import TextAreaSkin from 'react-polymorph/lib/skins/simple/TextAreaSkin';
import MyRichTextAreaSkin from './components/MyRichTextAreaSkin';

export default (props) => (
  <TextArea skin={props.canEditRichText ? MyRichTextAreaSkin : TextAreaSkin} />
);
```

The `TextArea` component in this example only renders what is provided as `skin` property, it does not
care about the details of its implementation. It handles the logic of auto-resizing the textarea without knowing
anything about the markup of the provided skin. To make this possible, the skin has to register certain skin
parts (elements) with the logic component:

`MyRichTextAreaSkin.js`
```javascript
import TextArea from 'react-polymorph/lib/components/TextArea';
import RichTextEditingToolbar from './RichTextEditingToolbar';

export default (props) => (
  <div>
    <RichTextEditingToolbar />
    <textarea ref={textarea => { props.component.registerSkinPart(TextArea.SKIN_PARTS.TEXT_AREA, textarea); }} />
  </div>
);
```

_more documentation coming soon …_
