import coordinatesToDistance from '../lib/cordinatesToDistance';

test('With empty values it returns 0', () => {
  expect(coordinatesToDistance([0, 0], [0, 0])).toBe(0);
});

test('Berlin to London', () => {
  const londonLatLong = [52.51604, 13.37691];
  const berlinLatLong = [51.50643, -0.12719];
  const distance = 929.6390680925713;
  expect(coordinatesToDistance(londonLatLong, berlinLatLong)).toBe(distance);
});
