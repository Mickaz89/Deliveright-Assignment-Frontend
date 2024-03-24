import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Input } from '@mui/material';

test('Input component renders and responds to user input', () => {
    const onChangeMock = jest.fn();

    render(
      <Input
        type="text"
        onChange={onChangeMock}
        value=""
      />
    );

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: 'test value' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });