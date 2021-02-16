import React, { memo } from 'react';
import styled from 'styled-components'
import {useCartDispatch, useCartStore, CartType} from '../hooks/useCart';
import { useProduct } from '../hooks/useProduct';

const Container = styled.div`
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
  color: #1e2d2b;
  width: 65%;
  line-height: 18px;
  font-size: 10px;
  padding: 15px 13px 13px 21px;
  letter-spacing: .02px;
  min-height: 100px;
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
  background: #fff;

  span {
    cursor: pointer;
    color: #000;
    font-size: 15px;
  }
  div {
    padding: 0 10px;
    font-size: 13px;
  }
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
  display: -webkit-box;
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
  -o-object-fit: contain;
  object-fit: contain;
`

const CartItem = memo(({ cartItem }: { cartItem: CartType }) => {
  const { productID, quantity } = cartItem
  const { currency } = useCartStore();
  const { products } = useProduct(currency)
  const { increaseItem, decreaseItem, removeItem } = useCartDispatch();
  const cartProduct = products[productID] || {}

  const handleAdd = () => increaseItem(productID)
  const handleSubtract = () => decreaseItem(productID)
  const handleRemove = () => removeItem(productID)

  return (
    <Container>
      <ProductDescription>
        <RemoveButton onClick={handleRemove}>x</RemoveButton>
        <h6>{cartProduct.title}</h6>
        <CounterWrapper>
          <Counter>
            <span onClick={handleSubtract} >-</span>
            <div> {quantity} </div>
            <span onClick={handleAdd} >+</span>
          </Counter>
          <Price>{`${currency} ${String(cartProduct.price * quantity)}`}</Price>
        </CounterWrapper>
      </ProductDescription>
      <ImageWrapper>
        <Image alt="Product Image" src={cartProduct.image_url}/>
      </ImageWrapper>
    </Container>
  );
})

export default CartItem;
