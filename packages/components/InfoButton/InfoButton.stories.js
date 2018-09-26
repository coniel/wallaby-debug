import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered';
import InfoButton from './InfoButton';

storiesOf('ui|InfoButton', module)
  .addDecorator(checkA11y)
  .addDecorator(centered)
  .add('standard', () => <InfoButton onClick={action('clicked')} />);
