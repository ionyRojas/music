import AppContext from 'context/appContext';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Plans from './';
import { BrowserRouter } from 'react-router-dom';

const server = setupServer(
  rest.get(
    'https://run.mocky.io/v3/eb4c5a60-7099-439d-bedf-ed338c49af5f',
    (req, res, ctx) => {
      return res(
        ctx.json({
          featureList: [
            {
              description: '50 million songs and your entire EMC Music library',
              personalUse: true,
              familyUse: true,
            },
          ],
          plansPrices: {
            personalUse: 1000,
            familyUse: 4500,
          },
        }),
      );
    },
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithRouter = (ui: any, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('<Plans /> test', () => {
  beforeEach(() => {
    renderWithRouter(
      <AppContext.Provider
        value={{
          actions: {
            selectedPlan: () => {},
          },
          appState: {},
        }}
      >
        <Plans />
      </AppContext.Provider>,
    );
  });

  test('it should render the payment button for personal use', async () => {
    await waitFor(() => screen.getByTestId('buy-personal-use'));

    const buyPersonal = screen.getByTestId('buy-personal-use');
    expect(buyPersonal).toBeInTheDocument();
  });

  test('it should render the payment button for family use', async () => {
    await waitFor(() => screen.getByTestId('buy-family-use'));

    const buyPersonal = screen.getByTestId('buy-family-use');
    expect(buyPersonal).toBeInTheDocument();
  });

  test('it should render the value of the personal plan', async () => {
    await waitFor(() => screen.getByText(/1000/i));
    const personalPrice = screen.getByText(/1000/i);
    expect(personalPrice).toBeInTheDocument();
  });

  test('it should render the value of the family plan', async () => {
    await waitFor(() => screen.getByText(/4500/i));
    const familyPrice = screen.getByText(/4500/i);
    expect(familyPrice).toBeInTheDocument();
  });
});
