import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Autocomplete } from '../source/components/Autocomplete';
import AutocompleteSkin from './helpers/AutocompleteSkin';
import { CONTEXT } from './helpers/context';

const OPTIONS = [
  'home',
  'cat',
  'dog',
  'fish'
];

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

test('Autocomplete renders correctly', () => {
  const component = renderer.create(
    <Autocomplete
      options={OPTIONS}
      context={CONTEXT}
      skin={AutocompleteSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete renders with label', () => {
  const component = renderer.create(
    <Autocomplete
      label="Enter your recovery phrase below"
      options={OPTIONS}
      context={CONTEXT}
      skin={AutocompleteSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete renders with a placeholder', () => {
  const component = renderer.create(
    <Autocomplete
      placeholder="Enter recovery phrase"
      options={OPTIONS}
      context={CONTEXT}
      skin={AutocompleteSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete renders with an error', () => {
  const component = renderer.create(
    <Autocomplete
      error="Your mnemonic phrase is incorrect"
      options={OPTIONS}
      context={CONTEXT}
      skin={AutocompleteSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete uses render prop - renderSelections', () => {
  const component = renderer.create(
    <Autocomplete
      options={OPTIONS}
      context={CONTEXT}
      skin={AutocompleteSkin}
      renderSelections={getSelectionProps => {
        const { selectedOptions, removeSelection } = getSelectionProps();

        return selectedOptions.map((option, index) => (
          <span key={index}>
            <span>{option}</span>

            <span>
              remove selection
              <button onClick={removeSelection.bind(null, option)} />
            </span>
          </span>
        ));
      }}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Autocomplete uses render prop - renderOptions', () => {
  const component = renderer.create(
    <Autocomplete
      options={OPTIONS}
      context={CONTEXT}
      skin={AutocompleteSkin}
      renderOptions={getOptionProps => {
        const { options } = getOptionProps({});

        return options.map((option, index) => (
          <li key={index}>
            <span>{`#${index}: ${option}`}</span>
          </li>
        ));
      }}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Autocomplete onChange simulations', () => {
  test('Autocomplete opens when clicked and shows options', () => {
    const wrapper = mount(
      <Autocomplete
        options={MNEMONIC_WORDS}
        context={CONTEXT}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.instance();
    const input = wrapper.find('input');
    const options = wrapper.find('div.options');

    // assert Autocomplete is closed
    // first, via state
    expect(component.state.isOpen).toBe(false);
    // then, via classnames
    expect(options.instance().className).toBe('options firstOptionHighlighted root isFloating isHidden');

    // simulate click on Autocomplete's input
    input.simulate('click', {});

    // assert Autocomplete is open
    // first, via state
    expect(component.state.isOpen).toBe(true);
    expect(component.state.filteredOptions.length).toBe(12);
    // then, via classnames
    expect(options.instance().className).toBe('options isOpen firstOptionHighlighted root isFloating');
  });

  test('Autocomplete closes if open and escape key is pressed', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mount(
      <Autocomplete
        options={MNEMONIC_WORDS}
        context={CONTEXT}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.instance();
    const input = wrapper.find('input');
    const options = wrapper.find('div.options');

    // assert Autocomplete is closed
    // first, via state
    expect(component.state.isOpen).toBe(false);
    // then, via classnames
    expect(options.instance().className).toBe('options firstOptionHighlighted root isFloating isHidden');

    // simulate click on Autocomplete's input
    input.simulate('click', {});

    // assert Autocomplete is open
    // first, via state
    expect(component.state.isOpen).toBe(true);
    expect(component.state.filteredOptions.length).toBe(12);
    // then, via classnames
    expect(options.instance().className).toBe('options isOpen firstOptionHighlighted root isFloating');

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
    const wrapper = mount(
      <Autocomplete
        options={MNEMONIC_WORDS}
        context={CONTEXT}
        skin={AutocompleteSkin}
      />
    );
    const component = wrapper.instance();
    const input = wrapper.find('input');
    const options = wrapper.find('div.options');

    // open Autocomplete
    input.simulate('click', {});

    // assert Autocomplete is open and is showing 12 options
    expect(component.state.isOpen).toBe(true);
    expect(options.instance().className).toBe('options isOpen firstOptionHighlighted root isFloating');
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

    const wrapper = mount(
      <Autocomplete
        options={MNEMONIC_WORDS}
        context={CONTEXT}
        skin={AutocompleteSkin}
      />
    );

    const component = wrapper.instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    // assert Autocomplete is open
    expect(component.state.isOpen).toBe(true);

    // set highlightedOption
    const highlightedOption = wrapper.find('li.highlightedOption');

    // assert highlighted option is 'box' (first option when MNEMONIC_WORDS is in abc order)
    expect(highlightedOption.text()).toBe('box');

    // simulate tab key being pressed
    map.keydown({ keyCode: 9, preventDefault() {} });

    // assert that selected options contains only 'box'
    expect(component.state.selectedOptions.length).toBe(1);
    expect(component.state.selectedOptions[0]).toBe('box');

    // assert Autocomplete is closed
    expect(component.state.isOpen).toBe(false);
  });

  test('Autcomplete selects highlighted option when enter key is pressed', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mount(
      <Autocomplete
        options={MNEMONIC_WORDS}
        context={CONTEXT}
        skin={AutocompleteSkin}
      />
    );

    const component = wrapper.instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    // assert Autocomplete is open
    expect(component.state.isOpen).toBe(true);

    // set highlightedOption
    const highlightedOption = wrapper.find('li.highlightedOption');

    // assert highlighted option is 'box' (first option when MNEMONIC_WORDS is in abc order)
    expect(highlightedOption.text()).toBe('box');

    // simulate enter key being pressed
    map.keydown({ keyCode: 13, preventDefault() {} });

    // assert that selected options contains only 'box'
    expect(component.state.selectedOptions.length).toBe(1);
    expect(component.state.selectedOptions[0]).toBe('box');

    // assert Autocomplete is closed
    expect(component.state.isOpen).toBe(false);
  });

  test('Autcomplete selects highlighted option when space key is pressed', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mount(
      <Autocomplete
        options={MNEMONIC_WORDS}
        context={CONTEXT}
        skin={AutocompleteSkin}
      />
    );

    const component = wrapper.instance();
    const input = wrapper.find('input');

    // open Autocomplete
    input.simulate('click', {});

    // assert Autocomplete is open
    expect(component.state.isOpen).toBe(true);

    // set highlightedOption
    const highlightedOption = wrapper.find('li.highlightedOption');

    // assert highlighted option is 'box' (first option when MNEMONIC_WORDS is in abc order)
    expect(highlightedOption.text()).toBe('box');

    // simulate space key being pressed
    map.keydown({ keyCode: 32, preventDefault() {} });

    // assert that selected options contains only 'box'
    expect(component.state.selectedOptions.length).toBe(1);
    expect(component.state.selectedOptions[0]).toBe('box');

    // assert Autocomplete is closed
    expect(component.state.isOpen).toBe(false);
  });

  test('Autcomplete updates highlighted option when down arrow key is pressed and selects it with click', () => {
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mount(
      <Autocomplete
        options={MNEMONIC_WORDS}
        context={CONTEXT}
        skin={AutocompleteSkin}
      />
    );

    const component = wrapper.instance();
    const input = wrapper.find('input');

    // assert Autocomplete is closed
    expect(component.state.isOpen).toBe(false);

    // open Autocomplete
    input.simulate('click', {});

    // assert Autocomplete is open and has 0 selected options
    expect(component.state.isOpen).toBe(true);
    expect(component.state.selectedOptions.length).toBe(0);

    // assert highlighted option is 'box' (first option when MNEMONIC_WORDS is in abc order)
    expect(wrapper.find('li.highlightedOption').text()).toBe('box');

    // simulate arrow down key being pressed 3 times
    map.keydown({ keyCode: 40, preventDefault() {} });
    map.keydown({ keyCode: 40, preventDefault() {} });
    map.keydown({ keyCode: 40, preventDefault() {} });
    wrapper.update();

    // assert that highlighted option is now 'dog',
    // which is the 4th option when MNEMONIC_WORDS is in abc order
    expect(wrapper.find('li.highlightedOption').text()).toBe('dog');

    // simulate click on highlighted option
    wrapper.find('li.highlightedOption').simulate('click', {});

    // assert selected options now contains only 'dog' and Autocomplete is closed
    expect(component.state.selectedOptions.length).toBe(1);
    expect(component.state.selectedOptions[0]).toBe('dog');
    expect(component.state.isOpen).toBe(false);
  });
});
