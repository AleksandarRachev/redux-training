import { cartConstants } from "../../constants/Cart/cart.constants";
import { productConstants } from "../../constants/Product/product.constants";

const cartReducer = (
  state = { cart: [], showCart: false, totalProducts: 0 },
  action
) => {
  switch (action.type) {
    case cartConstants.OPEN_CART:
      return { ...state, showCart: true };
    case cartConstants.CLOSE_CART:
      return { ...state, showCart: false };
    case productConstants.ADD_PRODUCT_TO_CART: {
      const index = findCartProductId(action.payload.product, state.cart);
      if (index === -1) {
        let cart = [...state.cart, { ...action.payload.product, quantity: 1 }];
        let showCart = cart.length === 1 ? true : state.showCart;
        return { ...state, cart, showCart };
      } else {
        let cart = [...state.cart];
        let product = { ...cart[index] };
        product.quantity++;
        cart[index] = product;
        return { ...state, cart };
      }
    }
    case cartConstants.COUNT_TOTAL_PRODUCTS: {
      const totalProducts = state.cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return { ...state, totalProducts };
    }
    case cartConstants.INCREMENT_ITEM_IN_CART: {
      const index = findCartProductId(action.payload.product, state.cart);
      let cart = [...state.cart];
      cart[index].quantity++;
      return { ...state, cart };
    }
    case cartConstants.DECREMENT_ITEM_IN_CART: {
      const index = findCartProductId(action.payload.product, state.cart);
      let cart = [...state.cart];
      let showCart = state.showCart;
      if (action.payload.product.quantity === 1) {
        cart.splice(index, 1);
        if (cart.length === 0) {
          showCart = false;
        }
      } else {
        cart[index].quantity--;
      }
      return { ...state, cart, showCart };
    }
    default:
      return state;
  }
};

function findCartProductId(product, cart) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      return i;
    }
  }
  return -1;
}

export default cartReducer;
