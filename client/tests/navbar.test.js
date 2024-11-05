const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
const { AuthProvider } = require('../src/AuthContext');
const Navbar = require('../src/pages/Navbar').default;
require('@testing-library/jest-dom');

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  test('should show and hide sidebar', () => {
    const sidebar = screen.getByRole('navigation').querySelector('.sidebar');

    expect(sidebar).toHaveStyle('display: none');

    const showButton = screen.getByLabelText(/menu-button/i);
    fireEvent.click(showButton);
    
    expect(sidebar).toHaveStyle('display: flex');

    const hideButton = screen.getByLabelText(/icon/i);
    fireEvent.click(hideButton);

    expect(sidebar).toHaveStyle('display: none');
  });
});