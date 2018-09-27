import React from 'react';
import PropTypes from 'prop-types';
import SecondaryActionButton from '@components/SecondaryActionButton';
import InfoIcon from '@material-ui/icons/InfoRounded';
import calculatePercentage from '@libs/helpers/calculatePercentage';

const InfoButton = props => (
  <SecondaryActionButton {...props}>
    {calculatePercentage(20, 100)}
    <InfoIcon />
  </SecondaryActionButton>
);

InfoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default InfoButton;
