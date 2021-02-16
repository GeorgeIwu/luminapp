import React from 'react';
import styled from 'styled-components'
import Header from './Header'
import Main from './Main'
import SiderBar from './SiderBar'
import {CartProvider} from './hooks/useCart';

const Container = styled.div`
  padding: 0;
  margin: 0;
`

function App() {

  return (
    <CartProvider>
      <Container>
        <Header />
        <Main />
        <SiderBar />
      </Container>
    </CartProvider>
  );
}

export default App;



