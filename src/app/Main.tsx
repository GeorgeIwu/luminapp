import React, { memo } from 'react';
import styled from 'styled-components'
import { ProductType } from './hooks/useProduct';
import { useCartDispatch, useCartStore } from './hooks/useCart';
import { useProduct } from './hooks/useProduct';
import { ProductItem } from './components';

const Container = styled.div`
  position: absolute;
  top:60px; right:0; bottom:0; left:0;
`
const ProductsWrapper = styled.div`
  background: #e2e6e3;
  animation: 0.6s ease-in-out 0s 1 normal none running animation-1qp25wx;
  flex-wrap: wrap;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  @media (min-width: 768px) {
    padding-left: 0rem;
    padding-right: 0rem;
  }
`

const Main = memo(() => {
  const { currency } = useCartStore()
  const { products } = useProduct(currency)
  const { addItem } = useCartDispatch()

  return (
    <Container>
      <ProductsWrapper>
        {Object.entries(products).map(([key, value]: [string, ProductType]) =>
          <ProductItem key={`${key}`} product={value} currency={currency} onAdd={addItem} />
        )}
      </ProductsWrapper>
    </Container>
  );
})

export default Main;
