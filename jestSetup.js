import 'raf/polyfill';
import sinon from 'sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jest-enzyme';

configure({ adapter: new Adapter() });

// Setup sinon global to be a sandbox which is restored after each test.
global.sinon = sinon.createSandbox();

afterEach(() => {
  global.sinon.restore();
});
