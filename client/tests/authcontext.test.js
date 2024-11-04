const React = require('react');
const { render, screen} = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
const { AuthProvider } = require('../src/AuthContext');
const Navbar = require('../src/pages/Navbar').default;
require('@testing-library/jest-dom');

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
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
    renderNavbar(true);

    expect(screen.getByLabelText(/sell/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/logout/i)).toBeInTheDocument();
  });

  test('hides "Sell an Item" and "Logout" when user is not logged in', () => {
    renderNavbar(false);

    expect(screen.queryByText(/Sell an Item/i)).toBeNull();
    expect(screen.queryByText(/Logout/i)).toBeNull();
  });
});