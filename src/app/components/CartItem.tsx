import React, { memo } from 'react';
import styled from 'styled-components'
import {useCartDispatch, useCartStore, CartType} from '../hooks/useCart';
import { useProduct } from '../hooks/useProduct';

const Container = styled.div`
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    min-height: inherit;
    max-height: inherit;
    -webkit-box-pack: justify;
    justify-content: space-between;
    position: relative;
    margin-bottom: 20px;
    background: #fff;
`

const ProductDescription = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  min-height: inherit;
  max-height: inherit;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;
  background: #fff;
`

const RemoveButton = styled.span`
  float: right;
  padding-right: 5px;
  position: absolute;
  right: 27px;
  margin-top: -10px;
  margin-right: -20px;
  font-size: 20px;
  opacity: .7;
  cursor: pointer;
  color: #000;
`

const CounterWrapper = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  font-size: 100%;
  margin-top: 10px;
`

const Counter = styled.div`
  border: .5px solid #bcbcbc;
  padding: 7px;
  width: 76px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`
const Price = styled.div`
  float: right;
  padding: 0 10px;
  width: inherit;
  font-size: 13px;
  letter-spacing: .03px;
`

const ImageWrapper = styled.div`
  background-color: #fdfdfd;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  color: #1e2d2b;
  width: 33.3%;
  padding-right: 15px;
`

const Image = styled.img`
  overflow: hidden;
  height: 80px;
  width: auto;
  object-fit: contain;
`

const CartItem = memo(({ cartItem }: { cartItem: CartType }) => {
  const { productID, quantity } = cartItem
  const { currency } = useCartStore();
  const { products } = useProduct(currency)
  const { increaseItem, decreaseItem } = useCartDispatch();
  const cartProduct = products[productID] || {}

  const handleAdd = () => increaseItem(productID)
  const handleSubtract = () => decreaseItem(productID)

  return (
    <Container>
      <RemoveButton>x</RemoveButton>
      <ProductDescription>
        <h6>{cartProduct.title}</h6>
        <div><span>MADE FOR:</span>Demo</div>
        <div>Combination</div>
        <div><span>One time purchase of</span> Two Month <span>supply</span>.</div>
        <CounterWrapper>
          <Counter>
            <span onClick={handleSubtract} >-</span>
            <span> {quantity} </span>
            <span onClick={handleAdd} >+</span>
          </Counter>
          <Price>{`${currency} ${String(cartProduct.price * quantity)}`}</Price>
        </CounterWrapper>
      </ProductDescription>
      <ImageWrapper><Image alt="Product Image" src={cartProduct.image_url}/></ImageWrapper>
    </Container>
  );
})

export default CartItem;
