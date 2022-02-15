import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Tests', ()=>{
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Search Books/i);
    expect(linkElement).toBeInTheDocument();
  });
});