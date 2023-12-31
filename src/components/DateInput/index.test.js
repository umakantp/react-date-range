import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DateInput from './index';

const date = new Date('01/01/2021');

describe('DateInput tests', () => {
  const onChange = jest.fn();
  const onFocus = jest.fn();

  test('Should set invalidFormat in state to true', () => {
    const isDateInRange = jest.fn();

    render(
      <DateInput
        readOnly={false}
        disabled={false}
        value={date}
        onChange={onChange}
        onFocus={onFocus}
        isDateInRange={isDateInRange}
        dateDisplayFormat={'MMM d, yyyy'}
        placeholder="Date input"
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Date input'), { target: { value: 'fooo' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Date input'), { key: 'Enter' });
    expect(screen.getByText('The date format is invalid')).toBeInTheDocument();
  });

  test('Should set outOfRange in state to true', () => {
    const isDateInRange = jest.fn(() => false);

    render(
      <DateInput
        readOnly={false}
        disabled={false}
        value={date}
        onChange={onChange}
        onFocus={onFocus}
        isDateInRange={isDateInRange}
        dateDisplayFormat={'MMM d, yyyy'}
        placeholder="Date input"
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Date input'), { target: { value: 'Dec 8, 2021' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Date input'), { key: 'Enter' });
    expect(screen.getByText('The date is out of range')).toBeInTheDocument();
  });
  test('Should call this.props.onChange if valid date', () => {
    const isDateInRange = jest.fn(() => true);

    render(
      <DateInput
        readOnly={false}
        disabled={false}
        value={date}
        onChange={onChange}
        onFocus={onFocus}
        isDateInRange={isDateInRange}
        dateDisplayFormat={'MMM d, yyyy'}
        placeholder="Date input"
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Date input'), { target: { value: 'Dec 8, 2021' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Date input'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
