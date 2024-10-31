import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../src/pages/Navbar';

describe('Navbar', () => {
  test('should show and hide sidebar', () => {
    render(<Navbar />);
    
    const sidebar = screen.getByRole('navigation').querySelector('.sidebar');

    expect(sidebar).toHaveStyle('display: flex');

    const hideButton = screen.getByRole('listitem', { name: /Seller/i });
    fireEvent.click(hideButton);
    
    expect(sidebar).toHaveStyle('display: none');

    const showButton = screen.getByRole('listitem', { name: /menu-button/i });
    fireEvent.click(showButton);

    expect(sidebar).toHaveStyle('display: flex');
  });
});