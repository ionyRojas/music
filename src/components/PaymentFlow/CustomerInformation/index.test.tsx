import AppContext from 'context/appContext';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerInformation from './';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const props = {
  handleTabsChange: jest.fn(),
  setActiveTab: jest.fn(),
};

const renderWithRouter = (ui: any, { route = '/payment-flow' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('<Plans /> test', () => {
  beforeEach(() => {
    renderWithRouter(
      <AppContext.Provider
        value={{
          actions: { selectedPlan: () => {}, addUserInfo: () => {} },
          appState: {},
        }}
      >
        <CustomerInformation {...props} />
      </AppContext.Provider>,
    );
  });

  test('it should render the first name input', () => {
    const input = screen.getByPlaceholderText('First Name');
    expect(input).toBeInTheDocument();
  });

  test('it should render the last name input', () => {
    const input = screen.getByPlaceholderText('Last Name');
    expect(input).toBeInTheDocument();
  });

  test('it should render the phone input', () => {
    const input = screen.getByPlaceholderText('1 (702) 123-4567');
    expect(input).toBeInTheDocument();
  });

  test('it should render the Address input', () => {
    const input = screen.getByPlaceholderText('Address');
    expect(input).toBeInTheDocument();
  });

  test('it should render the Country input', () => {
    const input = screen.getByPlaceholderText('Country');
    expect(input).toBeInTheDocument();
  });

  test('it should render the City input', () => {
    const input = screen.getByPlaceholderText('City');
    expect(input).toBeInTheDocument();
  });

  test('it should render the Postal Code input', () => {
    const input = screen.getByPlaceholderText('Postal Code');
    expect(input).toBeInTheDocument();
  });

  test('it should an Error on the First Name input because it length is less than 3', async () => {
    userEvent.type(screen.getByPlaceholderText('First Name'), 'Jo');
    userEvent.tab();

    await waitFor(() => {
      expect(screen.getByTestId('first-name-error')).toBeInTheDocument();
    });
  });

  test('it should call Onsubmit method and it should call the setActiveTab  and handleTabsChange methods', async () => {
    userEvent.type(screen.getByPlaceholderText('First Name'), 'Jonathan');
    userEvent.type(screen.getByPlaceholderText('Last Name'), 'Rojas');
    userEvent.type(
      screen.getByPlaceholderText('1 (702) 123-4567'),
      '3100000000',
    );
    userEvent.type(
      screen.getByPlaceholderText('Address'),
      'calle 23 # 23 - 23',
    );
    userEvent.type(screen.getByPlaceholderText('Country'), 'Colombia');
    userEvent.type(screen.getByPlaceholderText('City'), 'Medellin');
    userEvent.type(screen.getByPlaceholderText('Postal Code'), '05534');
    const submitButton = screen.getByText(/Continue/i);
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(props.setActiveTab).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(props.handleTabsChange).toHaveBeenCalledTimes(1);
    });
  });
});
