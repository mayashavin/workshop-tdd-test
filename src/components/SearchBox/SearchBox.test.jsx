import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { SearchBox } from './SearchBox';
 
describe('SearchBox', () => {
    it('renders a search box', async () => {
        const { getByRole, getByText, unmount } = await render(<SearchBox label="Search" onChange={vi.fn()} placeholder="Placeholder" value="1" />);

        expect(getByText('Search')).toBeInTheDocument();
        expect(getByRole('textbox')).toHaveValue('1');
        expect(getByRole('textbox')).toHaveAttribute('placeholder', 'Placeholder');

        unmount();
    });

    it('calls onChange when input value changes', async () => {
        const onChange = vi.fn();
        const { getByRole, unmount } = await render(<SearchBox label="Search" onChange={onChange} />);
        const input = getByRole('textbox');

        fireEvent.change(input, { target: { value: '2' } });

        expect(onChange).toHaveBeenCalledWith('2');

        unmount();
    });
});