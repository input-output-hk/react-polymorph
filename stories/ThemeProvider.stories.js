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
import { ProgressBar } from '../source/components/ProgressBar';
import { Flex } from '../source/components/layout/Flex';
import { FlexItem } from '../source/components/layout/FlexItem';
import { Gutter } from '../source/components/layout/Gutter';

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
import { ProgressBarSkin } from '../source/skins/simple/ProgressBarSkin';

// themes
import { SimpleTheme } from '../source/themes/simple';
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

// themeOverrides
import buttonOverrides from './theme-overrides/buttonOverrides.scss';
import checkboxOverrides from './theme-overrides/checkboxOverrides.scss';
import progressBarOverrides1 from './theme-overrides/progressBarOverrides.scss';
import progressBarOverrides2 from './theme-overrides/customProgressBar.scss';

// constants
import { IDENTIFIERS } from '../source/components';

const MNEMONICS = ['home', 'cat', 'dog', 'fish', 'home', 'cat', 'dog', 'fish', 'home', 'cat', 'dog', 'fish'];

const {
  AUTOCOMPLETE,
  BUBBLE,
  BUTTON,
  CHECKBOX,
  FORM_FIELD,
  INPUT,
  MODAL,
  OPTIONS,
  PROGRESS_BAR,
  RADIO,
  SWITCH,
  TEXT_AREA,
  TOGGLER
} = IDENTIFIERS;

const CUSTOM_THEME = {
  [TEXT_AREA]: CustomTextAreaTheme,
  [TOGGLER]: CustomTogglerTheme,
  [SWITCH]: CustomSwitchTheme,
  [RADIO]: CustomRadioTheme,
  [OPTIONS]: CustomOptionsTheme,
  [INPUT]: CustomInputTheme,
  [MODAL]: CustomModalTheme,
  [BUTTON]: CustomButtonTheme,
  [CHECKBOX]: CustomCheckboxTheme,
  [AUTOCOMPLETE]: CustomAutocompleteTheme,
  [BUBBLE]: SimpleTheme[BUBBLE],
  [FORM_FIELD]: SimpleTheme[FORM_FIELD]
};

storiesOf('ThemeProvider', module)
  // ====== ThemeProvider Stories ======

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
          {/* <Options
            isOpen
            options={MNEMONICS}
            isOpeningUpward={false}
            noResults={false}
            skin={OptionsSkin}
          /> */}
        </div>

        <div style={{ margin: '400px 100px 250px 100px', height: '225px' }}>
          <Autocomplete
            label="Autocomplete opening upward"
            options={MNEMONICS}
            placeholder="Enter mnemonic..."
            maxSelections={12}
            maxVisibleOptions={20}
            invalidCharsRegex={/[^a-zA-Z]/g}
            skin={AutocompleteSkin}
            isOpeningUpward
          />
        </div>

        <div style={{ margin: '400px 100px 250px 100px', height: '225px' }}>
          <Autocomplete
            label="Autocomplete opening downward"
            options={MNEMONICS}
            placeholder="Enter mnemonic..."
            maxSelections={12}
            maxVisibleOptions={20}
            invalidCharsRegex={/[^a-zA-Z]/g}
            skin={AutocompleteSkin}
          />
        </div>
      </ThemeProvider>
    ))
  )

  .add('themeOverrides',
    withState({
      checked: false,
      progress: 0,
      previousOverrides: {
        [BUTTON]: buttonOverrides,
        [CHECKBOX]: checkboxOverrides,
        [PROGRESS_BAR]: progressBarOverrides2
      },
      themeOverrides: {
        [BUTTON]: buttonOverrides,
        [CHECKBOX]: checkboxOverrides,
        [PROGRESS_BAR]: progressBarOverrides1
      }
    }, store => {
      const switchOverrides = () => {
        const { previousOverrides, themeOverrides } = store.state;
        store.set({
          previousOverrides: themeOverrides,
          themeOverrides: previousOverrides
        });
      };

      return (
        <ThemeProvider theme={SimpleTheme} themeOverrides={store.state.themeOverrides}>
          <Gutter padding="30vh 20vw">
            <Flex row justifyContent="space-around" alignItems="center">
              <FlexItem>
                <Button
                  label="Switch ProgressBar's Theme"
                  onClick={switchOverrides}
                  skin={ButtonSkin}
                />
              </FlexItem>

              <FlexItem>
                <Button
                  label="+ 10%"
                  onClick={() => store.set({ progress: store.state.progress + 10 })}
                  skin={ButtonSkin}
                />
              </FlexItem>

              <FlexItem>
                <Button
                  label="- 10%"
                  onClick={() => store.set({ progress: store.state.progress - 10 })}
                  skin={ButtonSkin}
                />
              </FlexItem>

              <FlexItem>
                <Checkbox
                  label="Reset"
                  checked={store.state.checked}
                  onChange={() => {
                    store.set({ checked: true, progress: 0 });
                    setTimeout(() => store.set({ checked: false }), 2000);
                  }}
                  skin={CheckboxSkin}
                />
              </FlexItem>
            </Flex>

            <div style={{ margin: '50px' }}>
              <ProgressBar
                label="100% Complete"
                progress={store.state.progress}
                skin={ProgressBarSkin}
              />
            </div>
          </Gutter>
        </ThemeProvider>
      );
    })
  );
