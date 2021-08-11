const { withEnzyme } = require('jest-expo-enzyme');

module.exports = {
  projects: [
    addConfig(withEnzyme(require('jest-expo/android/jest-preset'))),
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    // '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
    '<rootDir>/src/components/batches/BatchListItem/BatchListItem.test.tsx',
    // C:\Users\Bigmo\Revature\Perfect-Personnel-Placement\frontend\src\components\Clients\__tests__\AddClient.test.js
  ],
  coveragePathIgnorePatterns: [
    '**/__tests__/**/*.[jt]s?(x)'
  ],
  coverageDirectory: 'coverage',
  testResultsProcessor: 'jest-sonar-reporter',
  coverageThreshold: {
    global: {
      statements: 70,
    },
  },
}


/**
 * Returns an array with a single string that tells Babel to ignore uncompiled
 * third-party React Native libraries.
 * 
 * @param {*} ignoreThese array of strings representing third-party libraries in node_modules
 * @returns array with a single string element
 */
function returnTransformIgnorePatterns(ignoreThese) {
  const start = 'node_modules/(?!(jest-)?(';
  const end = ')/)';
  let str = start;
  for(const i in ignoreThese) {
    if (+i === 0) {
      str += `${ignoreThese[i]}`;
    } else {
      str += `|${ignoreThese[i]}`;
    }
  }
  str += end;
  return [str];
}


/**
 * `withEnzyme` comes with a lot of useful configuration to save you time, 
 * but sometimes you need a little more. This function will modify the object 
 * returned by `withEnzyme` to suit the needs of our project. 
 * 
 * @param {*} config the object returned by `withEnzyme`
 * @returns the same object but with modified properties
 */
function addConfig(config) {
  // add extra setup file
  config.setupFilesAfterEnv.push('<rootDir>/__tests__/setup.js');
  
  // comment this out if you want to test all files
  config.testMatch = [
    // '<rootDir>/src/components/Clients/__tests__/AddClient.test.js',
    '<rootDir>/src/components/batches/BatchListItem/BatchListItem.test.tsx'
  ];

  // third-party libraries that throw errors
  // see https://jestjs.io/docs/tutorial-react-native#transformignorepatterns-customization 
  const ignoreThese = [
    'react-native',
    '@react-native-community',
    'expo(nent)?',
    '@expo(nent)?/.*',
    'react-navigation',
    '@react-navigation/.*',
    '@unimodules/.*',
    'unimodules',
    'sentry-expo',
    'native-base',
    'react-native-svg',
    '@react-native-picker',
    'react-native-picker-select',
    'react-native-chart-kit',
    'react-native-calendars',
    'react-native-swipe-gestures',
    'react-native-calendar-picker',
    'expo-font',
    'expo-asset',
    'expo-constants',
  ];

  console.log(
    'transformIgnorePatterns set to: \n', 
    returnTransformIgnorePatterns(ignoreThese)+'\n'
  );

  config.transformIgnorePatterns = returnTransformIgnorePatterns(ignoreThese);

  config.displayName = {
    name: 'components',
    color: 'blue',
  };

  return config;
}
