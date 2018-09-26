import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';

export const ICON_STYLE = {
  width: 18,
  height: 18,
};

const styles = theme => ({
  root: {
    height: 32,
    width: 32,
    color: theme.palette.grey[300],
    transition: 'color 0.2s',
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },
  },
});

const SecondaryActionButton = ({ classes, className, children, ...props }) => (
  <IconButton {...props} className={classNames(classes.root, className)}>
    {React.cloneElement(children, {
      style: ICON_STYLE,
    })}
  </IconButton>
);

SecondaryActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

SecondaryActionButton.defaultProps = {
  className: undefined,
};

export default withStyles(styles)(SecondaryActionButton);
