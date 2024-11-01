import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../src/pages/Navbar';
import '@testing-library/jest-dom';

describe('Navbar', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  test('should show and hide sidebar', () => {
    const sidebar = screen.getByRole('navigation').querySelector('.sidebar');

    // Initially, sidebar should be visible
    expect(sidebar).toHaveStyle('display: none');

    // Click the hide button
    const showButton = screen.getByLabelText(/menu-button/i);
    fireEvent.click(showButton);


    // // Sidebar should be hidden
    expect(sidebar).toHaveStyle('display: flex');

    // Click the show button
    const hideButton = screen.getByLabelText(/icon/i);
    fireEvent.click(hideButton);

    // Sidebar should be visible again
    expect(sidebar).toHaveStyle('display: none');
  });
});