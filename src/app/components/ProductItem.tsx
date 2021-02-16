import React, { memo } from 'react';
import styled from 'styled-components'
import { ProductType } from '../hooks/useProduct';

const Container = styled.div`
  padding: 3rem 2rem;
  width: 33.3333%;
  flex-direction: column;
  display: flex;
  text-align: center;
  align-items: center;
  background: rgb(226, 230, 227);
`

const ImageWrapper = styled.div`
  flex: 1 1 0%;
  position: relative;
  color: inherit;
  text-decoration: none;
  background-color: transparent;
`

const Image = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 170px;
  flex: 1 1 0%;
  height: auto;
  display: block;
  vertical-align: middle;
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
`

 const ProductItem = memo(({ product, currency, onAdd }: { product: ProductType, currency: string, onAdd: (product: number) => any }) => {

  const title = product.title
  const imgSrc = product.image_url
  const amount = product.price

  const handleAdd = () => onAdd(product.id)

  return (
    <Container>
      <ImageWrapper>
        <Image alt={title} src={imgSrc} />
        <Title>{title}</Title>
      </ImageWrapper>
      <AmountWrapper>
        <Amount>{`From: ${currency} ${amount}`}</Amount>
      </AmountWrapper>
      <Button onClick={handleAdd} >Add to Cart</Button>
    </Container>
  );
})

export default ProductItem;
