import React, { memo } from 'react';
import styled from 'styled-components'
import { useCartStore } from '../hooks/useCart';
import { useProduct } from '../hooks/useProduct';

const Container = styled.div`
  position: fixed
  border-top: 1px solid #d0d0d0;
  box-shadow: 0 -4px 12px rgb(0 0 0 / 15%);
  z-index: 1;
  padding: 0 20px 20px;
  align-items: baseline;
`

const SubTotal = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 15px;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border: 0 solid #6e7b70;
  border-top: none;

  div {
    font-family: FF Bau Medium,san-serif;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-align: end;
    align-items: flex-end;
  }
`

const ButtonWrapper = styled.div`
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  margin-bottom: 15px;
`

const Button = styled.div`
  color: #fff;
  letter-spacing: 2px;
  background-color: #4b5548;
  border: none;
  margin-top: 15px;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  padding: 16px 20px;
  text-align: center;
  text-decoration: none;
`

const CartItem = memo(() => {
  const { items, currency } = useCartStore();
  const { products = {} } = useProduct(currency)

  const totalAmount = items.reduce((acc, { quantity, productID }) => {
    const product = products[productID] || {}
    acc += product.price * quantity;
    return acc;
  }, 0);

  return (
    <Container>
      <SubTotal>
        <span>Subtotal</span>
        <div>{`${currency} ${totalAmount}`}</div>
      </SubTotal>
      <ButtonWrapper>
        <Button>PROCEED TO CHECKOUT</Button>
      </ButtonWrapper>
    </Container>
  );
})

export default CartItem;
