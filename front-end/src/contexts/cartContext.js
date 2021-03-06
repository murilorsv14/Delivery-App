import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext({
  updateCart: () => {},
  cart: [],
  cartTotal: 0,
  resetCart: () => {},
});

function CartContextProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [cartTotal, setCartTotal] = useState(0);

  const addProduct = (product, quantity) => {
    setCart([...cart, { ...product, quantity }]);
  };

  const removeProduct = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };

  const updateProduct = (id, quantity) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id) return ({ ...product, quantity });
      return product;
    });
    setCart(updatedCart);
  };

  const updateCart = (product, quantity) => {
    const isProductOnCart = cart.find((cartProduct) => cartProduct.id === product.id);

    if (!isProductOnCart && quantity > 0) return addProduct(product, quantity);

    if (quantity > 0) return updateProduct(product.id, quantity);

    return removeProduct(product.id);
  };

  const resetCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setCartTotal(total);

    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={ {
        updateCart,
        cart,
        cartTotal,
        resetCart,
      } }
    >
      { children }
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default CartContextProvider;
