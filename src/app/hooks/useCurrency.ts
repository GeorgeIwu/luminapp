import React from 'react'
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

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

export const useCurrency = () => {

  const { data, status } = useQuery("currencies", fetchCurrencies);

  const currencies = data?.currency || []

  return {
    status,
    currencies,
  };
};
