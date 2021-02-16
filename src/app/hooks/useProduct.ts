import React from 'react'
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const ENDPOINT = "https://pangaea-interviews.now.sh/api/graphql"

const GET_PRODUCTS = gql`
  query GetProducts($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;

export type ProductType = {
  id: number
  title: string
  image_url: string
  price: number
}

const normalizeProducts = (products: ProductType[] = []) => {
  const newProducts = products.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {} as Record<string, ProductType>);
  return newProducts
}

const fetchProducts = async (args: any) => {
  const currency = args.queryKey[1] || "USD"
  const products = await request(ENDPOINT, GET_PRODUCTS, { currency })
  return products
}

export const useProduct = (currency: string = "NGN") => {

  const { data, status } = useQuery(["products", currency], fetchProducts);

  const products = normalizeProducts(data?.products)

  return {
    status,
    products,
  };
};
