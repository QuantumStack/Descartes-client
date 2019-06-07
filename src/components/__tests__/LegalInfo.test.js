import React from 'react';
import { render } from '@testing-library/react';
import LegalInfo from '../LegalInfo';

it('renders without crashing', () => {
  const { getByText } = render(<LegalInfo />);
  expect(getByText('Descartes')).toBeInTheDocument();
});
