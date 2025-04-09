import React from 'react'; 
import { render, screen } from '@testing-library/react';
import CarDetail from '@/app/car/[id]/page';

// Mock the Next.js router & fetch
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
  useRouter: () => ({ push: jest.fn() }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        id: 1,
        make: 'Test',
        model: 'Car',
        year: 2020,
        vrn: 'VRN001',
        healthStatus: 'Good',
        faultCount: 0,
      }),
  })
) as jest.Mock;

describe('Car Detail Page', () => {
  it('renders car details', async () => {
    render(<CarDetail />);
    const title = await screen.findByText(/test car/i);
    expect(title).toBeInTheDocument();
  });
});
