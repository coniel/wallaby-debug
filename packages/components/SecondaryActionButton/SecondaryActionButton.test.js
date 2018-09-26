import React from 'react';
import { getClasses, createShallow } from '@material-ui/core/test-utils';
import SecondaryActionButton, { ICON_STYLE } from './SecondaryActionButton';

const onClick = () => {};

describe('SecondaryActionButton', () => {
  let classes;
  let shallow;
  let wrapper;

  beforeAll(() => {
    classes = getClasses(<SecondaryActionButton />);
    shallow = createShallow({ dive: true });
    wrapper = shallow(
      <SecondaryActionButton className="foo-class" onClick={onClick}>
        <div id="child" className="bar-class" />
      </SecondaryActionButton>,
    );
  });

  it('renders a styled IconButton', () => {
    expect(wrapper.name()).toBe('WithStyles(IconButton)');
  });

  it('has a root class', () => {
    expect(wrapper.hasClass(classes.root)).toEqual(true);
  });

  it('preserves applied className', () => {
    expect(wrapper.hasClass('foo-class')).toEqual(true);
  });

  it('renders its children', () => {
    expect(wrapper.find('#child').length).toBe(1);
  });

  it('applies the icon style to its children', () => {
    expect(wrapper.find('#child').prop('style')).toBe(ICON_STYLE);
  });

  it('passes other props to IconButton', () => {
    expect(wrapper.prop('onClick')).toBe(onClick);
  });
});
