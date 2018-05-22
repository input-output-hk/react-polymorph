// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import {
  ThemeProvider,
  NumericInput,
  Checkbox,
  Modal,
  TextArea,
  Autocomplete,
  Radio,
  Options,
  Button
} from '../source/components';

// skins
import {
  InputSkin,
  SwitchSkin,
  ModalSkin,
  TextAreaSkin,
  TogglerSkin,
  AutocompleteSkin,
  RadioSkin,
  OptionsSkin,
  ButtonSkin,
  CheckboxSkin
} from '../source/skins/simple';

// theme
import { IDENTIFIERS } from '../source/themes/API';
import CustomTextAreaTheme from './theme-customizations/TextArea.custom.scss';
import CustomTogglerTheme from './theme-customizations/Toggler.custom.scss';
import CustomSwitchTheme from './theme-customizations/Switch.custom.scss';
import CustomRadioTheme from './theme-customizations/Radio.custom.scss';
import CustomOptionsTheme from './theme-customizations/Options.custom.scss';
import CustomInputTheme from './theme-customizations/Input.custom.scss';
import CustomModalTheme from './theme-customizations/Modal.custom.scss';
import CustomButtonTheme from './theme-customizations/Button.custom.scss';
import CustomCheckboxTheme from './theme-customizations/Checkbox.custom.scss';
import CustomAutocompleteTheme from './theme-customizations/Autocomplete.custom.scss';
import { BubbleTheme } from '../source/themes/simple/';

const OPTIONS = [
  'home',
  'cat',
  'dog',
  'fish'
];

const CUSTOM_THEME = {
  [IDENTIFIERS.TEXT_AREA]: CustomTextAreaTheme,
  [IDENTIFIERS.TOGGLER]: CustomTogglerTheme,
  [IDENTIFIERS.SWITCH]: CustomSwitchTheme,
  [IDENTIFIERS.RADIO]: CustomRadioTheme,
  [IDENTIFIERS.OPTIONS]: CustomOptionsTheme,
  [IDENTIFIERS.INPUT]: CustomInputTheme,
  [IDENTIFIERS.MODAL]: CustomModalTheme,
  [IDENTIFIERS.BUTTON]: CustomButtonTheme,
  [IDENTIFIERS.CHECKBOX]: CustomCheckboxTheme,
  [IDENTIFIERS.AUTOCOMPLETE]: CustomAutocompleteTheme,
  [IDENTIFIERS.BUBBLE]: BubbleTheme
};

storiesOf('ThemeProvider', module)
  // ====== Stories ======

  .add('custom theme',
    withState({
      textAreaValue: '',
      numericInputValue: '',
      togglerChecked: false,
      switchChecked: false,
      radioSelected: false,
      modalIsOpen: false
    }, store => (
      <ThemeProvider theme={CUSTOM_THEME}>
        <div style={{ margin: '100px' }}>
          <TextArea
            value={store.state.textAreaValue}
            onChange={textAreaValue => store.set({ textAreaValue })}
            placeholder="type here..."
            skin={TextAreaSkin}
          />
        </div>

        <div style={{ margin: '100px' }}>
          <Checkbox
            checked={store.state.togglerChecked}
            onChange={() => store.set({ togglerChecked: !store.state.togglerChecked })}
            themeId={IDENTIFIERS.TOGGLER}
            labelLeft="Included"
            labelRight="Excluded"
            skin={TogglerSkin}
          />
        </div>

        <div style={{ margin: '100px' }}>
          <Checkbox
            themeId={IDENTIFIERS.SWITCH}
            label="custom theme"
            checked={store.state.switchChecked}
            onChange={() => store.set({ switchChecked: !store.state.switchChecked })}
            skin={SwitchSkin}
          />
        </div>

        <div style={{ margin: '100px' }}>
          <Radio
            label="Radio with a custom theme"
            selected={store.state.radioSelected}
            onChange={() => store.set({ radioSelected: !store.state.radioSelected })}
            skin={RadioSkin}
          />
        </div>

        <div style={{ margin: '100px' }}>
          <NumericInput
            value={store.state.numericInputValue}
            placeholder="0.000000"
            maxAfterDot={6}
            onChange={numericInputValue => store.set({ numericInputValue })}
            skin={InputSkin}
          />
        </div>

        <div style={{ margin: '100px' }}>
          <Button
            label="click here to open modal"
            onClick={() => store.set({ modalIsOpen: true })}
            skin={ButtonSkin}
          />
          <Modal
            isOpen={store.state.modalIsOpen}
            triggerCloseOnOverlayClick
            onClose={() => store.set({ modalIsOpen: !store.state.modalIsOpen })}
            skin={ModalSkin}
          >
            <h1>Click outside of modal to close</h1>
          </Modal>
        </div>

        <div style={{ margin: '100px' }}>
          <Checkbox
            label="check here"
            checked={store.state.checkboxChecked}
            onChange={() => store.set({ checkboxChecked: !store.state.checkboxChecked })}
            skin={CheckboxSkin}
          />
        </div>

        <div style={{ margin: '100px', height: '200px' }}>
          <Options
            isOpen
            options={OPTIONS}
            isOpeningUpward={false}
            noResults={false}
            skin={OptionsSkin}
          />
        </div>

        <div style={{ margin: '100px', height: '225px' }}>
          <Autocomplete
            label="Custom Autocomplete theme"
            options={OPTIONS}
            placeholder="Enter mnemonic..."
            maxSelections={12}
            maxVisibleOptions={5}
            invalidCharsRegex={/[^a-zA-Z]/g}
            skin={AutocompleteSkin}
          />
        </div>
      </ThemeProvider>
    ))
  );
