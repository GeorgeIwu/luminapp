import React, { memo } from 'react';
import styled from 'styled-components'
import { ProductType } from '../hooks/useProduct';
import { useCartDispatch } from '../hooks/useCart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  align-items: center
  background: rgb(226, 230, 227);
  padding: 2.5rem 0.5rem;
  width: 50%;
  @media (min-width: 768px) {
    padding: 3rem 2rem;
    width: 33.3%;
  }
`

const Card = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  flex: 1 1 0%;
`

const ImageWrapper = styled.div`
  flex: 1 1 0%;
  position: relative;
  color: inherit;
  text-decoration: none;
  background-color: transparent;
`

const Image = styled.img`
  display: block;
  flex: 1 1 0%;
  height: auto;
  width: auto;
  overflow: hidden;
  -o-object-fit: contain;
  object-fit: contain;
  // vertical-align: middle;
  max-width: 100%;
  max-height: 170px;
`

const Title = styled.h2`
  font-family: "FF Bau Regular", sans-serif;
  font-weight: 400;
  font-size: 0.8125rem;
  line-height: 1.7;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`
const AmountWrapper = styled.div`
  margin-top: 0.5rem;
  margin-left: 0rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const Amount = styled.p`
  font-family: "FF Bau Regular", sans-serif;
  font-weight: 400;
  font-size: 0.8125rem;
  line-height: 1.7;
  margin-left: 0rem;
  margin-right: 0.25rem;
`

const Button = styled.button`
  margin-top: 0.5rem;
  margin-left: 0rem;
  display: flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease 0s;
  user-select: none;
  position: relative;
  vertical-align: middle;
  outline: none;
  border: 0px;
  line-height: 1.2;
  padding-top: 2px;
  font-weight: 600;
  font-family: "FF Bau Regular", sans-serif;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 52px;
  background: rgb(75, 85, 72);
  color: rgb(252, 252, 249);
  width: 100%;
  max-width: 100%;
  white-space: normal;

  &:hover {
    background: #000;
  }
`

 const ProductItem = memo(({ product, currency }: { product: ProductType, currency: string }) => {

  const title = product.title
  const imgSrc = product.image_url
  const amount = product.price
  const { addItem, toggleCartDisplay } = useCartDispatch()

  const handleAdd = () => {
    addItem(product.id)
    toggleCartDisplay()
  }

  return (
    <Container>
      <Card>
        <ImageWrapper>
          <Image alt={title} src={imgSrc} />
          <Title>{title}</Title>
        </ImageWrapper>
        <AmountWrapper>
          <Amount>{`From: ${currency} ${amount}`}</Amount>
        </AmountWrapper>
        <Button onClick={handleAdd} >Add to Cart</Button>
      </Card>
    </Container>
  );
})

export default ProductItem;
