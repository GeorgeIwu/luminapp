import React from 'react';
import styled from 'styled-components'
import logo from '../logo.svg';
import {useCartDispatch, useCartStore} from './hooks/useCart';

const Container = styled.div`
  height: 60px;
  top: 0rem;
  width: 100%;
  position: fixed;
  background-color: rgb(252, 252, 249);
  z-index: 1100;
  box-shadow: grey 0px 2px 3px -3px;
}


`
const Button = styled.button`
    top: 0;
    right: 0;
    width: 34px;
    height: 34px;
    align-items: center;
`;

function Header() {
  const {toggleDisplay} = useCartDispatch();
  const {items} = useCartStore();

  return (
    <Container>
       <Button onClick={toggleDisplay} >Ca{items.length}</Button>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      HEADER
    </Container>
  );
}

export default Header;
