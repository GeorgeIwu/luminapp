import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from "react-query";
import { useCurrency } from '../hooks/useCurrency';
import { useProduct } from '../hooks/useProduct';
import Header from '../Header';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: any }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

test('renders header react link', () => {
  render(<Header />);
  const spanElement = screen.getByText(/Account/i);
  expect(spanElement).toBeInTheDocument();
});

test('should fetch all currencies', async () => {
  const { result, waitFor } = renderHook(() => useCurrency(), { wrapper });

  await waitFor(() => result.current.status === "success" , { timeout: 6000 })

  expect(result.current.currencies).toContain("NGN")
})

test('should fetch all products', async () => {
  const currency = "USD"
  const { result, waitFor } = renderHook(() => useProduct(currency), { wrapper });

  await waitFor(() => result.current.status === "success" , { timeout: 6000 })

  expect(result.current.products).not.toEqual({})
})

