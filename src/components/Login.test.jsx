import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('renders the login form', () => {
    render(<Login onLogin={() => {}} />);
    expect(screen.getByRole('form', { name: /login form/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error on invalid credentials', () => {
    render(<Login onLogin={() => {}} />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
}); 