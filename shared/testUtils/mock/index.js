const path = require('path');
const { PACKAGE_VEST } = require('../../../shared/constants');
const packagePath = require('../../../util/packagePath');

const vestSrc = packagePath(PACKAGE_VEST, 'src');

const mock = (moduleName, mockImplementation) => {
  const mockFn = jest.fn(mockImplementation);
  jest.resetModules();
  require(vestSrc); // re-require vest for global assignments
  jest.mock(moduleName, () => ({
    __esModule: true,
    default: mockFn,
  }));
  return mockFn;
};

export default mock;
