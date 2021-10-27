import { Dispatch } from 'react';

type SelectedPlanType = Readonly<{
  name: string;
  price: number;
}>;

type UserInfoType = Readonly<{
  address: string;
  city: string;
  firstName: string;
  lastName: string;
  outsideUs: boolean;
}>;

type InitialState = Readonly<{
  creditCard: {
    cardNumber: string;
    nameOnCard: string;
    expiredDate: string;
    cardType: string;
  };
  selectedPlan: SelectedPlanType;
  userInfo: UserInfoType;
}>;

type ActionsType = (dispatch: Dispatch<any>) => Readonly<{
  addUserInfo: (type: UserInfoType) => void;
  cardNumber: (card: string) => void;
  cardType: (type: string) => void;
  expiredDate: (date: string) => void;
  nameOnCard: (name: string) => void;
  resetCreditCard: () => void;
  selectedPlan: (selectedPlan: SelectedPlanType) => void;
}>;

export const initialState: InitialState = {
  creditCard: {
    cardNumber: '',
    nameOnCard: '',
    expiredDate: '',
    cardType: '',
  },
  selectedPlan: {
    name: '',
    price: -1,
  },
  userInfo: {
    address: '',
    city: '',
    firstName: '',
    lastName: '',
    outsideUs: false,
  },
};

const ADD_USER = 'ADD_USER';
const CARD_EXPIRED_DATE = 'CARD_EXPIRED_DATE';
const CARD_NUMBER = 'CARD_NUMBER';
const CARD_TYPE = 'CARD_TYPE';
const NAME_ON_CARD = 'NAME_ON_CARD';
const RESET_CREDIT_CARD = 'RESET_CREDIT_CARD';
const SELECTED_PLAN = 'SELECTED_PLAN';

/**
 * Reducer who's transforms the information of the global context state
 * @param  {Object} state
 * @param  {function} action
 */
export function appReducer(
  state: InitialState,
  action: { type: string; payload?: string },
) {
  const { type, payload = '' } = action;

  switch (type) {
    case SELECTED_PLAN:
      return { ...state, selectedPlan: payload };
    case CARD_NUMBER:
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          cardNumber: payload,
        },
      };
    case NAME_ON_CARD:
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          nameOnCard: payload,
        },
      };
    case CARD_EXPIRED_DATE:
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          expiredDate: payload,
        },
      };
    case CARD_TYPE:
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          cardType: payload,
        },
      };
    case RESET_CREDIT_CARD:
      return {
        ...state,
        creditCard: {
          cardNumber: '',
          nameOnCard: '',
          expiredDate: '',
          cardType: '',
        },
      };
    case ADD_USER:
      return {
        ...state,
        userInfo: payload,
      };
    default:
      return state;
  }
}

/**
 * api with the actions to change the global state
 * @param  {function} dispatch a wrapper of actions to dispatch reducers
 * @return {function}
 */
export const actions: ActionsType = (dispatch: Dispatch<any>) => ({
  selectedPlan: (selectedPlan: SelectedPlanType) =>
    dispatch({ type: SELECTED_PLAN, payload: selectedPlan }),
  resetCreditCard: () => dispatch({ type: RESET_CREDIT_CARD }),
  cardNumber: (card: string) => dispatch({ type: CARD_NUMBER, payload: card }),
  nameOnCard: (name: string) => dispatch({ type: NAME_ON_CARD, payload: name }),
  expiredDate: (date: string) =>
    dispatch({ type: CARD_EXPIRED_DATE, payload: date }),
  cardType: (type: string) => dispatch({ type: CARD_TYPE, payload: type }),
  addUserInfo: (userInfo: UserInfoType) =>
    dispatch({ type: ADD_USER, payload: userInfo }),
});
