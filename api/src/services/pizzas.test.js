import { getPizzas } from './pizzas';
import { describe, expect, it, vi, afterEach } from 'vitest';
// import * as utils from "./filterItems";

vi.mock('./filterItems', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    // replace some exports
    filterItems: vi.fn().mockImplementation(() => [{ id: 1, title: 'Pizza 1' }]),
  }
})

describe('getPizzas', () => {
  // eslint-disable-next-line no-undef
  const fetchSpy = vi.spyOn(global, 'fetch');
  // const filterItemsSpy = vi.spyOn(utils, 'filterItems');
  
  it('returns a list of pizzas', async () => {
    vi.stubEnv('API_URL', 'http://exploringvue.com/.netlify/functions')
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Pizza 1' }],
    });
      const pizzas = await getPizzas();
      expect(pizzas.length).toBe(1);
  });

  it('throws error if url env is not valid', async () => {
      expect(() => getPizzas()).rejects.toThrow('API_URL is not set');
  });    

  it('throws error if failed to fetch pizzas', async () => {
      vi.stubEnv('API_URL', 'http://exploringvue.com/.netlify/functions')
      fetchSpy.mockRejectedValue(new Error('Failed to fetch pizzas'));
      
      await expect(() => getPizzas()).rejects.toThrowError('Failed to fetch pizzas');
  })

  it('returns response filtered by search query', async () => {
    vi.stubEnv('API_URL', 'http://exploringvue.com/.netlify/functions')
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Pizza 1' }, { id: 2, title: 'Pizza 2' }],
    });
    // filterItemsSpy.mockImplementation(() => [{ id: 1, title: 'Pizza 1' }]);

    const pizzas = await getPizzas('1');
    expect(pizzas.length).toBe(1);
  });
  
  afterEach(() => {
    fetchSpy.mockClear();
    vi.unstubAllEnvs();
    // filterItemsSpy.mockClear();
  })
});