import React, {createContext, useContext, useState} from 'react'
import {useStorage} from './useStorage';

export type CartType = {
  quantity: number
  productID: number
}

type Props = {
  children: React.ReactNode;
  initialState?: typeof defaultStore;
};

type Store = {
  showCart: boolean;
  items: Array<CartType>,
  setShowCart: React.Dispatch<any>;
  setItems: React.Dispatch<any>;
  setCurrency: React.Dispatch<any>;
};

const defaultStore = {items: new Array<CartType>(), currency: "USD", showCart: false};
const defaultDispatch = {
  toggleCartDisplay: () => {},
  addItem: (productID: number) => {},
  removeItem: (productID: number) => {},
  increaseItem: (productID: number) => {},
  decreaseItem: (productID: number) => {},
  selectCurrency: (currency: string) => {},
};

const StoreContext = createContext(defaultStore);
const DispatchContext = createContext(defaultDispatch);

const getActions = (store: Store) => {
  const addItem = (productID: number) => {
    const items = store.items.slice()
    const existingProduct = items.find(i => i.productID === productID)

    if (existingProduct) {
      increaseItem(existingProduct.productID)
    } else {
      items.push({ productID, quantity: 1 })
      store.setItems(items)
    }
  }

  const removeItem = (productID: number) => {
    const items = store.items.slice()
    const productIndex = items.findIndex(i => i.productID === productID)

    if (productIndex > -1) {
      items.splice(productIndex, 1)
      store.setItems(items)
    }
  }

  const increaseItem = (productID: number) => {
    const items = store.items.map((item) => {
      if (item.productID !== productID) {
        return item
      }
      return {
        ...item,
        quantity: item.quantity + 1
      }
    })
    store.setItems(items)
  }

  const decreaseItem = (productID: number) => {
    const items = store.items.map((item) => {
      if (item.productID !== productID) {
        return item
      }
      const quantity = item.quantity
      return {
        ...item,
        quantity: quantity > 1 ? quantity - 1 : quantity
      }
    })
    store.setItems(items)
  }
  const toggleCartDisplay = () => {
    store.setShowCart(!store.showCart)
  }

  const selectCurrency = store.setCurrency

  return { addItem, removeItem, increaseItem, decreaseItem, toggleCartDisplay, selectCurrency }
};

export const CartProvider = ({children, initialState}: Props) => {
  const {items: _items, currency: _currency} = initialState || defaultStore;
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setItems] = useStorage(_items, '_items');
  const [currency, setCurrency] = useStorage(_currency, "_currency");

  const items = cartItems as [CartType]
  const store = {items, showCart, currency};
  const dispatch = getActions({showCart, items, setItems, setShowCart, setCurrency});

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useCartStore = () => useContext(StoreContext);

export const useCartDispatch = () => useContext(DispatchContext);
