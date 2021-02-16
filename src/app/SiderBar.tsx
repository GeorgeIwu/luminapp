import React, { memo, useMemo } from 'react';
import styled from 'styled-components'
import {useCartDispatch, useCartStore, CartType} from './hooks/useCart';
import { useCurrency } from './hooks/useCurrency';
import {CartItem, TotalAmount} from './components';

const Modal = styled.div<{ show: boolean; }>`
    z-index: 1200;
    display: ${({show}) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.5);
`;

const Container = styled.div`
    position:fixed;
    width: 33%;
    height: 100%;
    top: 0;
    right: 0;
    padding: 0.75rem;
    color: rgba(0,0,139, 0.9);

    background-color: #f2f2ef;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    overflow-x: auto;
    max-width: 550px;
`;

const Button = styled.button`
    justify-content: flex-start;
    width: 30px;
    height: 30px;
    border: 1px solid gray;
    border-radius: 50%
`;

const CrncyWrapper = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const Crncy = styled.select`
  padding: 8px 10px 5px 10px;
  background-position: 100% 60%;
  cursor: pointer;
`

const SideBar = memo(() => {
  const { toggleCartDisplay, selectCurrency } = useCartDispatch();
  const { currency, items, showCart } = useCartStore();
  const { currencies } = useCurrency()

  const handleCurrencyChange = useMemo(() => (e: any) => {
    const crncy = e.target.value
    selectCurrency(crncy);
  }, [])

  return (
    <Modal show={showCart}>
      <Container>
        <Button onClick={toggleCartDisplay} >{">"}</Button>
        <CrncyWrapper>
          <Crncy onChange={handleCurrencyChange}>
            {currencies.map((c: string)=> <option key={c} value={c} selected={String(currency) === c}>{c}</option>)}
          </Crncy>
        </CrncyWrapper>
        {items.map((cartItem: CartType) =>
          <CartItem key={cartItem.productID} cartItem={cartItem} />
        )}
        <TotalAmount />
      </Container>
    </Modal>
  );
})

export default SideBar;
