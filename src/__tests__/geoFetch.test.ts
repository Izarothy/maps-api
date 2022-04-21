import geoFetch from '../lib/geoFetch';

test('With no match it returns null', () => {
  expect(geoFetch('', '', '')).resolves.toBe(null);
});

test('With invalid input it returns null ', () => {
  expect(geoFetch('randominput', 'randominput', '')).resolves.toBe(null);
});

test('Example city - Washington', () => {
  expect(geoFetch('Washington', '', '')).resolves.toBeTruthy();
});
