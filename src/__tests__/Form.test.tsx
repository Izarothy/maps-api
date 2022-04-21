import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('Form is initially on the screen', () => {
  render(<App />);

  expect(screen.getByRole('form')).toBeInTheDocument();
});

test('Form is initially empty', () => {
  render(<App />);

  expect(screen.getAllByRole('textbox').every((input: HTMLInputElement) => input.value === '')).toBe(true);
});
