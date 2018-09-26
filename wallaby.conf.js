/* eslint-disable */
module.exports = function(wallaby) {
  // Babel, jest-cli and some other modules may be located under
  // react-scripts/node_modules, so need to let node.js know about it
  var path = require('path');
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts/node_modules');
  require('module').Module._initPaths();

  return {
    debug: true,
    files: [
      'packages/**/*.+(js|jsx|graphql|gql|ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!packages/**/*.test.+(js|jsx|ts|tsx)',
      '!packages/**/*.stories.+(js|jsx|ts|tsx)',
      '!packages/libs/kas/**/*.test.+(js|jsx|ts|tsx)',
      '!packages/**/node_modules/**',
    ],

    tests: [
      'packages/**/*.test.+(js|jsx|ts|tsx)',
      '!packages/**/node_modules/**',
    ],

    env: {
      type: 'node',
      runner: 'node',
    },

    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app'],
      }),
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'React',
      }),
    },

    setup: wallaby => {
      const path = require('path');
      const paths = require('react-scripts/config/paths');
      const jestConfig = require('react-scripts/scripts/utils/createJestConfig')(
        p => require.resolve('react-scripts/' + p),
        path.resolve('./packages/apps/ibguides'),
        [path.resolve('./packages/apps/ibguides')],
      );

      delete jestConfig.transform['^.+\\.(js|jsx)$'];
      delete jestConfig.transform['^.+\\.(ts|tsx)$'];
      delete jestConfig.testEnvironment;

      jestConfig.setupTestFrameworkScriptFile = path.resolve('./packages/apps/ibguides/src/setupTests.js');

      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest',
  };
};
