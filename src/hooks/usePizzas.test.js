import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {usePizzas} from './usePizzas';

describe('usePizzas', () => {
    // eslint-disable-next-line no-undef
    const fetchSpy = vi.spyOn(global, 'fetch');

    it('returns a list of pizzas', async () => {
        fetchSpy.mockResolvedValue({
            ok: true,
            json: async () => [{ id: 1, title: 'Pizza 1' }],
        });
        const { result } = renderHook(() => usePizzas());
        await waitFor(() => { expect(result.current.pizzas.length).toBe(1) });
    });

    it('throws error if failed to fetch pizzas', async () => {
        fetchSpy.mockRejectedValue(new Error('Failed to fetch pizzas'));
        const { result } = renderHook(() => usePizzas());
        await waitFor(() => { expect(result.current.isError).toBe(true) });
    });

    it('returns loading state', async () => {
        fetchSpy.mockResolvedValue({
            ok: true,
            json: async () => [{ id: 1, title: 'Pizza 1' }],
        });
        const { result } = renderHook(() => usePizzas());
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => { expect(result.current.isLoading).toBe(false) });
    });
    

    afterEach(() => {
        fetchSpy.mockClear();
    })
});