import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { createMuiTheme } from '@material-ui/core/styles';
import { muiTheme } from 'storybook-addon-material-ui';
import defaultTheme from '@libs/theme';
import mathematicsTheme from '@libs/theme/mathematics';
import 'storybook-chromatic';
import './baseline.css';

setOptions({
  /**
   * name to display in the top left corner
   * @type {String}
   */
  name: 'Coniel',
  /**
   * URL for name in top left corner to link to
   * @type {String}
   */
  url: '#',
  /**
   * show addon panel as a vertical panel on the right
   * @type {Boolean}
   */
  addonPanelInRight: true,
  /**
   * sorts stories
   * @type {Boolean}
   */
  sortStoriesByKind: true,
  /**
   * regex for finding the hierarchy separator
   * @example:
   *   null - turn off hierarchy
   *   /\// - split by `/`
   *   /\./ - split by `.`
   *   /\/|\./ - split by `/` or `.`
   * @type {Regex}
   */
  hierarchySeparator: /\//,
  /**
   * regex for finding the hierarchy root separator
   * @example:
   *   null - turn off multiple hierarchy roots
   *   /\|/ - split by `|`
   * @type {Regex}
   */
  hierarchyRootSeparator: /\|/,
});

addDecorator(muiTheme([defaultTheme, mathematicsTheme]));

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../packages", true, /\.*\.stories\.js?$/));
}

configure(loadStories, module);