import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the App component', () => {
  render(<App />);
  expect(screen.getByText(/Application React/i)).toBeInTheDocument();
});
