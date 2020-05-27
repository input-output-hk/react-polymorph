module.exports = {
  verbose: false,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/__mocks__/fileMock.js',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/__snapshots__',
    '<rootDir>/__tests__/__mocks__',
    '<rootDir>/__tests__/helpers',
  ],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
};
