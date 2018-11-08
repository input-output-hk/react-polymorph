import React from 'react';

import { Autocomplete } from '../source/components/Autocomplete';
import { AutocompleteSkin } from '../source/skins/simple/AutocompleteSkin';
import { mountInSimpleTheme } from './helpers/theming';

const MNEMONIC_WORDS = [
  'home',
  'cat',
  'dog',
  'fish',
  'hide',
  'hover',
  'duck',
  'category',
  'join',
  'paper',
  'box',
  'tab'
];

const ABC_SORTED_MNEMONICS = [
  'home',
  'cat',
  'dog',
  'fish',
  'hide',
  'hover',
  'duck',
  'category',
  'join',
  'paper',
  'box',
  'tab'
].sort();

describe('Autocomplete onChange simulations', () => {
  test('Autocomplete is closed by default and when clicked is open and displays options', () => {
    const wrapper = mountInSimpleTheme(
      <Autocomplete
        options={MNEMONIC_WORDS}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.find('Autocomplete').instance();
    const input = wrapper.find('input');
    const options = wrapper.find('div.options');

    // assert Autocomplete is closed by default
    // first, via state
    expect(component.state.isOpen).toBe(false);
    // then, via classnames
    expect(options.instance().className).toBe('options firstOptionHighlighted root isFloating isHidden');

    // open Autocomplete
    input.simulate('click', {});

    // assert Autocomplete is open and displaying options
    // first, via state
    expect(component.state.isOpen).toBe(true);
    expect(component.state.filteredOptions.length).toBe(12);
    // then, via classnames
    expect(options.instance().className).toBe('options isOpen firstOptionHighlighted root isFloating');
  });

  test('Autocomplete puts options in abc order and highlights first option by default when open', () => {
    const wrapper = mountInSimpleTheme(
      <Autocomplete
        options={MNEMONIC_WORDS}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.find('Autocomplete').instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    const arraysAreEqual = (array1, array2) => {
      if (!array1 || !array2) { return false; }
      if (!Array.isArray(array1) || !Array.isArray(array2)) { return false; }
      if (array1.length !== array2.length) { return false; }

      const unequalValues = array1.filter((value, index) => value !== array2[index]);
      return unequalValues.length === 0;
    };

    // assert Autocomplete's filteredOptions are in ABC order
    expect(arraysAreEqual(ABC_SORTED_MNEMONICS, component.state.filteredOptions)).toBe(true);

    // set highlightedOption
    const highlightedOption = wrapper.find('li.highlightedOption');

    // assert highlighted option is the first option by default
    expect(highlightedOption.text()).toBe(ABC_SORTED_MNEMONICS[0]);
  });

  test('Autocomplete closes if open and escape key is pressed', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mountInSimpleTheme(
      <Autocomplete
        options={MNEMONIC_WORDS}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.find('Autocomplete').instance();
    const input = wrapper.find('input');
    const options = wrapper.find('div.options');

    // simulate click on Autocomplete's input
    input.simulate('click', {});

    // simulate escape key being pressed
    map.keydown({ keyCode: 27 });
    wrapper.update();

    // assert Autocomplete is now closed again
    // first, via state
    expect(component.state.isOpen).toBe(false);
    // then, via classnames
    expect(options.instance().className).toBe('options firstOptionHighlighted root isFloating isHidden');
  });

  test('Autocomplete shows correct options after user input is simulated', () => {
    const wrapper = mountInSimpleTheme(
      <Autocomplete
        options={MNEMONIC_WORDS}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.find('Autocomplete').instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    // assert Autocomplete's filteredOptions has a length of 12 (all options)
    expect(component.state.filteredOptions.length).toBe(12);

    // simulate user typing 'h'
    input.simulate('change', { target: { value: 'h' } });

    // assert inputValue is now 'h' and options beginning with 'h' are shown
    // first, via component state
    expect(component.state.inputValue).toBe('h');
    expect(component.state.filteredOptions.length).toBe(3); // hide, home, hover
    // then, via classnames
    expect(wrapper.find('li.option').length).toBe(3);
    expect(wrapper.find('li.option').first().text()).toBe('hide');
    expect(wrapper.find('li.highlightedOption').text()).toBe('hide');

    // simulate more specific user input of 'hover'
    input.simulate('change', { target: { value: 'hover' } });

    // assert inputValue is now 'hover' and only the 'hover' option is shown
    // first, via component state
    expect(component.state.inputValue).toBe('hover');
    expect(component.state.filteredOptions.length).toBe(1);
    // then, via classnames
    expect(wrapper.find('li.option').length).toBe(1);
    expect(wrapper.find('li.option').first().text()).toBe('hover');
    expect(wrapper.find('li.highlightedOption').text()).toBe('hover');
  });

  test('Autcomplete selects highlighted option when tab key is pressed', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mountInSimpleTheme(
      <Autocomplete
        options={MNEMONIC_WORDS}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.find('Autocomplete').instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    // simulate tab key being pressed
    map.keydown({ keyCode: 9, preventDefault() {} });

    // assert that selected options contains only 'box' (1st ABC sorted option)
    expect(component.state.selectedOptions.length).toBe(1);
    expect(component.state.selectedOptions[0]).toBe(ABC_SORTED_MNEMONICS[0]);

    // assert Autocomplete is closed after option is selected
    expect(component.state.isOpen).toBe(false);
  });

  test('Autcomplete selects highlighted option when enter key is pressed', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mountInSimpleTheme(
      <Autocomplete
        options={MNEMONIC_WORDS}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.find('Autocomplete').instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    // simulate enter key being pressed
    map.keydown({ keyCode: 13, preventDefault() {} });

    // assert that selected options contains only 'box' (1st ABC sorted option)
    expect(component.state.selectedOptions.length).toBe(1);
    expect(component.state.selectedOptions[0]).toBe(ABC_SORTED_MNEMONICS[0]);

    // assert Autocomplete is closed after option is selected
    expect(component.state.isOpen).toBe(false);
  });

  test('Autcomplete selects highlighted option when space key is pressed', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mountInSimpleTheme(
      <Autocomplete
        options={MNEMONIC_WORDS}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.find('Autocomplete').instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    // simulate space key being pressed
    map.keydown({ keyCode: 32, preventDefault() {} });

    // assert that selected options contains only 'box' (1st ABC sorted option)
    expect(component.state.selectedOptions.length).toBe(1);
    expect(component.state.selectedOptions[0]).toBe(ABC_SORTED_MNEMONICS[0]);

    // assert Autocomplete is closed after option is selected
    expect(component.state.isOpen).toBe(false);
  });

  test('Autcomplete updates highlighted option when down arrow key is pressed and selects it with click', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mountInSimpleTheme(
      <Autocomplete
        options={MNEMONIC_WORDS}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.find('Autocomplete').instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    // simulate arrow down key being pressed 3 times
    map.keydown({ keyCode: 40, preventDefault() {} });
    map.keydown({ keyCode: 40, preventDefault() {} });
    map.keydown({ keyCode: 40, preventDefault() {} });
    wrapper.update();

    // assert that highlighted option is now 'dog' (4th ABC sorted options)
    expect(wrapper.find('li.highlightedOption').text()).toBe(ABC_SORTED_MNEMONICS[3]);

    // simulate click on highlighted option
    wrapper.find('li.highlightedOption').simulate('click', {});

    // assert selected options now contains only 'dog' (4th ABC sorted options)
    // and Autocomplete is closed
    expect(component.state.selectedOptions.length).toBe(1);
    expect(component.state.selectedOptions[0]).toBe(ABC_SORTED_MNEMONICS[3]);
    expect(component.state.isOpen).toBe(false);
  });

  test('Autocomplete deletes a selected option when backspace is pressed', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mountInSimpleTheme(
      <Autocomplete
        options={MNEMONIC_WORDS}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.find('Autocomplete').instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    // simulate user typing 'hide'
    input.simulate('change', { target: { value: 'hide' } });

    // select 'hide' via pressing enter key
    map.keydown({ keyCode: 13, preventDefault() {} });

    // assert 'hide' is now a selected option
    expect(component.state.selectedOptions.length).toBe(1);
    expect(component.state.selectedOptions[0]).toBe('hide');

    // assert inputValue is empty before attempting to delete 'hide'
    expect(component.state.inputValue).toBe('');

    // simulate backspace to delete 'hide'
    input.simulate('keydown', { keyCode: 8 });

    // assert backspace deleted the selected option 'hide'
    expect(component.state.selectedOptions.length).toBe(0);
  });
});
