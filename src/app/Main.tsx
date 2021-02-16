import React, { memo } from 'react';
import styled from 'styled-components'
import { ProductType } from './hooks/useProduct';
import { useCartStore } from './hooks/useCart';
import { useProduct } from './hooks/useProduct';
import { ProductItem } from './components';

const Container = styled.div`
  position: absolute;
  top:60px; right:0; bottom:0; left:0;
`
const ProductsWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background: #e2e6e3;

  @media (min-width: 768px) {
    padding-left: 0rem;
    padding-right: 0rem;
  }
`

const Main = memo(() => {
  const { currency } = useCartStore()
  const { products } = useProduct(currency)

  return (
    <Container>
      <ProductsWrapper>
        {Object.entries(products).map(([key, value]: [string, ProductType]) =>
          <ProductItem key={`${key}`} product={value} currency={currency} />
        )}
      </ProductsWrapper>
    </Container>
  );
})

export default Main;
