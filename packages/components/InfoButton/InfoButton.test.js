import React from 'react';
import { shallow } from 'enzyme';
import InfoIcon from '@material-ui/icons/InfoRounded';
import InfoButton from './InfoButton';

describe('InfoButton', () => {
  let onClick;
  let wrapper;

  beforeAll(() => {
    onClick = () => {};
    wrapper = shallow(<InfoButton onClick={onClick} foo="bar" />);
    wrapper = wrapper.dive(); // dive into withStyles()
  });

  it('renders a SecondaryActionButton', () => {
    expect(wrapper.find('SecondaryActionButton').length).toBe(1);
  });

  it('renders an InfoRounded icon', () => {
    expect(wrapper.find(InfoIcon).length).toBe(1);
  });

  it('passes down props to SecondaryActionButton', () => {
    expect(wrapper.find('SecondaryActionButton').prop('onClick')).toBe(onClick);
    expect(wrapper.find('SecondaryActionButton').prop('foo')).toBe('bar');
  });
});
