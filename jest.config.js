module.exports = {
  roots: [ '<rootDir>/src' ],
  testMatch: [ '**/?(*.)+(spec|test).+(ts|tsx|js)' ],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  // Setup Enzyme
  snapshotSerializers: [ 'enzyme-to-json/serializer' ],
  setupFilesAfterEnv: [ '<rootDir>/src/setupEnzyme.ts' ]
}