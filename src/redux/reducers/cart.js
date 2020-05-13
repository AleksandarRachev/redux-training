import { actionTypes as cartActionTypes } from "../../constants/Cart/cart.constants";
import { actionTypes as productActionTypes } from "../../constants/Product/product.constants";

const countTotalProducts = (cart) => {
  // dark magic
  return 5;
}

const cartReducer = (
  state = {
    cart: [],
    showCart: false,
    totalProducts: 0
  },
  action
) => {
  switch (action.type) {
    case cartActionTypes.OPEN_CART:
      return {
        ...state,
        showCart: true
      };

    case cartActionTypes.CLOSE_CART:
      return {
        ...state,
        showCart: false
      };

    // ideally casrt reducer will not work with product action types
    // ADD_PRODUCT_TO_CART i more a cart action, than a product action
    // product actions are add, edit, delete products
    // cart actions are add, edit, delete cart items, regardless of whether they are products or something else
    case productActionTypes.ADD_PRODUCT_TO_CART: {
      let found = false;
      const newCart = state.cart.map(product => {
        if (product.id === action.payload.product.id) {
          found = true;
          return {
            ...product,
            quantity: product.quantity + 1,
          }
        }

        return product;
      });

      if (!found) {
        newCart.push({
          ...action.payload.product,
          quantity: 1,
        })
      }

      return {
        ...state,
        cart: newCart,
        totalProducts: countTotalProducts(newCart), // use the dark magic
      };
    }

    // loose this and integrate in all CART_CHANGE actions
    case cartActionTypes.COUNT_TOTAL_PRODUCTS: {
      const totalProducts = state.cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return { ...state, totalProducts };
    }
    
    case cartActionTypes.INCREMENT_ITEM_IN_CART: {
      const newCart = state.cart.map(product => {
        if (product.id === action.payload.product.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          }
        }

        return product;
      });
      
      return {
        ...state,
        cart: newCart,
        totalProducts: countTotalProducts(newCart),
      };
    }
    
    case cartActionTypes.DECREMENT_ITEM_IN_CART: {
      // change the entire thing for a state.cart.map() approach and it will be a lot simpler
      // and you won't need findCartProductId() anymore
      const index = findCartProductId(action.payload.product, state.cart);
      let cart = [...state.cart];
      // let showCart = state.showCart;
      if (action.payload.product.quantity === 1) {
        cart.splice(index, 1);
        // if (cart.length === 0) {
        //   showCart = false;
        // }
      } else {
        cart[index].quantity--;
        // ^ this is mutating the product in the state, that should be immutable, create a new product, look at INCREMENT_ITEM_IN_CART
      }

      return {
        ...state,
        cart,
        showCart: !!cart.length, // quick and easy to read
        totalProducts: countTotalProducts(cart),
      };
    }
    
    default:
      return state;
  }
};

// you can remove this when you fix DECREMENT_ITEM_IN_CART to use map()
function findCartProductId(product, cart) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      return i;
    }
  }
  return -1;
}

export default cartReducer;
