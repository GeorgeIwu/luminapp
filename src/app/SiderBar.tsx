import React, { memo, useMemo } from 'react';
import styled from 'styled-components'
import {useCartDispatch, useCartStore, CartType} from './hooks/useCart';
import { useCurrency } from './hooks/useCurrency';
import {CartItem} from './components';

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
    -webkit-transition: opacity .4s ease-in-out .1s,-webkit-transform .4s cubic-bezier(.28,.47,.29,.86);
    transition: opacity .4s ease-in-out .1s,-webkit-transform .4s cubic-bezier(.28,.47,.29,.86);
    transition: transform .4s cubic-bezier(.28,.47,.29,.86),opacity .4s ease-in-out .1s;
    transition: transform .4s cubic-bezier(.28,.47,.29,.86),opacity .4s ease-in-out .1s,-webkit-transform .4s cubic-bezier(.28,.47,.29,.86);
`;

const Button = styled.button`
    width: 14px;
    height: 14px;
`;

const CrncyWrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
`

const Crncy = styled.select`
  padding: 8px 13px 5px 10px;
  background-position: 100% 60%;
  cursor: pointer;
`

const SideBar = memo(() => {
  const { toggleDisplay, selectCurrency } = useCartDispatch();
  const { currency, items, showCart } = useCartStore();
  const { currencies } = useCurrency()

  const handleCurrencyChange = useMemo(() => (e: any) => {
    const crncy = e.target.value
    selectCurrency(crncy);
  }, [])

  return (
    <Modal show={showCart}>
      <Container>
        <Button onClick={toggleDisplay} >hide</Button>
        <CrncyWrapper>
          <Crncy onChange={handleCurrencyChange}>
            {currencies.map((c: string)=> <option key={c} value={c} selected={String(currency) === c}>{c}</option>)}
          </Crncy>
        </CrncyWrapper>
        {items.map((cartItem: CartType) =>
          <CartItem key={cartItem.productID} cartItem={cartItem} />
        )}
      </Container>
    </Modal>
  );
})

export default SideBar;
