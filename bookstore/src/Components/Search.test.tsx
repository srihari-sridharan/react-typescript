import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';

describe('Search Tests', ()=>{
  test('renders learn react link', () => {
    render(<Search />);
    const linkElement = screen.getByText(/Search Books/i);
    expect(linkElement).toBeInTheDocument();
  });
});