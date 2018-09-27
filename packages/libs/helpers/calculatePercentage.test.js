import calculatePercentage from './calculatePercentage';

describe('calculatePercentage', () => {
  it('returns a percentage rounded to the nearest integer', () => {
    expect(calculatePercentage(31, 47)).toBe(66);
  });

  it('returns 0 if divisor is 0', () => {
    expect(calculatePercentage(10, 0)).toBe(0);
  });
});
