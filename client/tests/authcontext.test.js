import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../src/AuthContext';
const Navbar = require('../src/pages/Navbar').default;
import { handleSuccess } from '../src/utils';


import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthContext'; // Adjust import as needed
import Navbar from './Navbar'; // Adjust import as needed

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear local storage before each test
  });

  const renderNavbar = (isLoggedIn = false) => {
    if (isLoggedIn) {
      localStorage.setItem('token', 'mockToken');
      localStorage.setItem('loggedInUser', 'Test User');
    }

    render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  test('shows "Sell an Item" and "Logout" when user is logged in', () => {
    renderNavbar(true); // Simulate user being logged in

    expect(screen.getByText(/Sell an Item/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('hides "Sell an Item" and "Logout" when user is not logged in', () => {
    renderNavbar(false); // Simulate user not being logged in

    expect(screen.queryByText(/Sell an Item/i)).toBeNull();
    expect(screen.queryByText(/Logout/i)).toBeNull();
  });
});