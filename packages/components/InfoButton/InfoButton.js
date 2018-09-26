import React from 'react';
import PropTypes from 'prop-types';
import SecondaryActionButton from '@components/SecondaryActionButton';
import InfoIcon from '@material-ui/icons/InfoRounded';

const InfoButton = props => (
  <SecondaryActionButton {...props}>
    <InfoIcon />
  </SecondaryActionButton>
);

InfoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default InfoButton;
