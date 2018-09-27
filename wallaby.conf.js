/* eslint-disable func-names, global-require, no-underscore-dangle, no-shadow, import/no-dynamic-require */
module.exports = function(wallaby) {
  // Babel, jest-cli and some other modules may be located under
  // react-scripts/node_modules, so need to let node.js know about it
  const path = require('path');
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
      '!packages/apps/ibguides-mobile/**',
      '!packages/**/node_modules/**',
      'packages/apps/ibguides/src/setupTests.js',
    ],

    tests: [
      'packages/**/*.test.+(js|jsx|ts|tsx)',
      '!packages/apps/ibguides-mobile/**',
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
        plugins: ['import-graphql'],
      }),
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'React',
      }),
    },

    setup: w => {
      const path = require('path');
      // const paths = require('react-scripts/config/paths');
      const jestConfig = require('react-scripts/scripts/utils/createJestConfig')(
        p => require.resolve(`react-scripts/${p}`),
        path.resolve('./packages/apps/ibguides'),
        [path.resolve('./packages/apps/ibguides')],
      );

      delete jestConfig.transform['^.+\\.(js|jsx)$'];
      delete jestConfig.transform['^.+\\.(ts|tsx)$'];
      delete jestConfig.testEnvironment;

      jestConfig.setupTestFrameworkScriptFile = path.resolve(
        './packages/apps/ibguides/src/setupTests.js',
      );

      const globby = require('globby');

      jestConfig.moduleNameMapper = globby
        .sync(path.join(w.projectCacheDir, 'packages/**/package.json'))
        .reduce(
          (acc, v) => {
            const packageJsonPath = v;
            acc[`^${require(packageJsonPath).name}`] = path.dirname(
              packageJsonPath,
            );
            return acc;
          },
          {},
        );

      console.log(jestConfig.moduleNameMapper);

      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest',
  };
};
