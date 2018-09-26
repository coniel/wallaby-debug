import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered';
import InfoIcon from '@material-ui/icons/Info';
import SecondaryActionButton from './SecondaryActionButton';

storiesOf('ui|SecondaryActionButton', module)
  .addDecorator(checkA11y)
  .addDecorator(centered)
  .add('standard', () => (
    <SecondaryActionButton onClick={action('onClick')}>
      <InfoIcon />
    </SecondaryActionButton>
  ));
