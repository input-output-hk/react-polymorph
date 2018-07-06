// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import { ThemeProvider } from '../source/components/ThemeProvider';
import { NumericInput } from '../source/components/NumericInput';
import { Checkbox } from '../source/components/Checkbox';
import { Modal } from '../source/components/Modal';
import { TextArea } from '../source/components/TextArea';
import { Autocomplete } from '../source/components/Autocomplete';
import { Radio } from '../source/components/Radio';
import { Options } from '../source/components/Options';
import { Button } from '../source/components/Button';

// skins
import { InputSkin } from '../source/skins/simple/InputSkin';
import { SwitchSkin } from '../source/skins/simple/SwitchSkin';
import { ModalSkin } from '../source/skins/simple/ModalSkin';
import { TextAreaSkin } from '../source/skins/simple/TextAreaSkin';
import { TogglerSkin } from '../source/skins/simple/TogglerSkin';
import { AutocompleteSkin } from '../source/skins/simple/AutocompleteSkin';
import { RadioSkin } from '../source/skins/simple/RadioSkin';
import { OptionsSkin } from '../source/skins/simple/OptionsSkin';
import { ButtonSkin } from '../source/skins/simple/ButtonSkin';
import { CheckboxSkin } from '../source/skins/simple/CheckboxSkin';

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
import { BubbleTheme, FormFieldTheme } from '../source/themes/simple';

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
  [IDENTIFIERS.BUBBLE]: BubbleTheme,
  [IDENTIFIERS.FORM_FIELD]: FormFieldTheme
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
            label="Switch with custom theme"
            themeId={IDENTIFIERS.SWITCH}
            checked={store.state.switchChecked}
            onChange={() => store.set({ switchChecked: !store.state.switchChecked })}
            skin={SwitchSkin}
          />
        </div>

        <div style={{ margin: '100px' }}>
          <Radio
            label="Radio with custom theme"
            selected={store.state.radioSelected}
            onChange={() => store.set({ radioSelected: !store.state.radioSelected })}
            skin={RadioSkin}
          />
        </div>

        <div style={{ margin: '100px' }}>
          <NumericInput
            label="NumericInput with custom theme"
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
            label="Checkbox with custom theme"
            checked={store.state.checkboxChecked}
            onChange={() => store.set({ checkboxChecked: !store.state.checkboxChecked })}
            skin={CheckboxSkin}
          />
        </div>

        <div style={{ margin: '50px' }}>
          <Options
            isOpen
            options={OPTIONS}
            isOpeningUpward={false}
            noResults={false}
            skin={OptionsSkin}
          />
        </div>

        <div style={{ margin: '400px 100px 250px 100px', height: '225px' }}>
          <Autocomplete
            label="Autocomplete with custom theme"
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
