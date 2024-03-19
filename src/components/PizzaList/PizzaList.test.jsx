import { describe, it, expect, vi } from 'vitest';
import * as usePizzaHook from '../../hooks/usePizzas';
import { render } from '@testing-library/react';
import { PizzaList } from './PizzaList';

describe('PizzaList', () => {
    const usePizzasSpy = vi.spyOn(usePizzaHook, 'usePizzas');

    it('renders a list of pizzas and a searchbox', async () => {
        usePizzasSpy.mockReturnValue({ pizzas: [{ id: 1, title: 'Pizza 1' }] });
        const { getByText, getByRole } = await render(<PizzaList />);

        expect(getByText('Pizza 1')).toBeInTheDocument();
        expect(getByRole('textbox')).toBeInTheDocument();
    });

    it('renders a loading state', async () => {
        usePizzasSpy.mockReturnValue({ isLoading: true });
        const { getByText } = await render(<PizzaList />);

        expect(getByText('Loading...')).toBeInTheDocument();
    });
    
    it('renders an error state', async () => {
        usePizzasSpy.mockReturnValue({ isError: true });
        const { getByText } = await render(<PizzaList />);

        expect(getByText('Failed to fetch pizzas')).toBeInTheDocument();
    });

    it('renders an empty state', async () => {
        usePizzasSpy.mockReturnValue({ pizzas: [] });
        const { getByText } = await render(<PizzaList />);

        expect(getByText('No pizzas found')).toBeInTheDocument();
    });
});