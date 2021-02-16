import React, {createContext, useContext} from 'react'
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import {useStorage} from './useStorage';

const ENDPOINT = "https://pangaea-interviews.now.sh/api/graphql"

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currency
  }
`;

const fetchCurrencies = async () => {
  const currencies = await request(ENDPOINT, GET_CURRENCIES)
  return currencies
}

export type CurrencyType = string

type Props = {
  children: React.ReactNode;
  initialState?: typeof defaultStore;
};

const defaultStore = {currencies: new Array<CurrencyType>(), currency: "USD"};
const defaultDispatch = {
  setCurrency: (currency: string) => {},
};

const StoreContext = createContext(defaultStore);
const DispatchContext = createContext(defaultDispatch);


export const CurrencyProvider = ({children, initialState}: Props) => {
  const {currency: _currency} = initialState || defaultStore;
  const [currency, setCurrency] = useStorage(_currency, "_currency");
  const { data } = useQuery("currencies", fetchCurrencies);

  const currencies = data?.currency || []

  const store = { currency, currencies };
  const dispatch = { setCurrency };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useCurrencyStore = () => useContext(StoreContext);

export const useCurrencyDispatch = () => useContext(DispatchContext);
