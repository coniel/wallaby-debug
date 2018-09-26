const rewireYarnWorkspaces = require('react-app-rewire-yarn-workspaces');
// const rewireInlineImportGraphqlAst = require('react-app-rewire-inline-import-graphql-ast');
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  const pluginOptions = Object.assign(
    {},
    {},
    {
      nodePath: '../../../node_modules',
    },
  );
  injectBabelPlugin(['import-graphql', pluginOptions], config);
  return rewireYarnWorkspaces(config, env);
  // return config;
};
