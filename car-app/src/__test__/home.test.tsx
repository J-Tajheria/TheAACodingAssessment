import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]), // mock empty car list
    })
  ) as jest.Mock;
});

describe('Home Page', () => {
  it('renders title', () => {
    render(<Home />);
    expect(screen.getByText(/car viewer/i)).toBeInTheDocument();
  });

  it('opens modal when Add Car button is clicked', () => {
    render(<Home />);
    const addBtn = screen.getByText(/create new car/i);
    fireEvent.click(addBtn);
    expect(screen.getByText(/add a new car/i)).toBeInTheDocument();
  });
});
