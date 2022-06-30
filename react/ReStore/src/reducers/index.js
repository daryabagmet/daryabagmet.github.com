import updateBooklist from './booklist';
import updateShoppingCart from './shopping-cart';

const reducer = (state, action) => {
  return {
    booklist: updateBooklist(state, action),
    shoppingCart: updateShoppingCart(state, action)
  }
}

export default reducer;