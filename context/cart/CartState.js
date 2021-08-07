import { useReducer } from 'react';
import {
  ADD_TO_CART,
  DELETE_CART,
  REMOVE_ITEM,
  SHOW_HIDE_CART,
  UPDATE_CART,
} from '../types';
import CartContext from './CartContext';
import CartReducer from './CartReducer';

const initialState = {
  showCart: false,
  cartItem: [],
};

const CartState = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };

  return (
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItem: state.cartItem,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
