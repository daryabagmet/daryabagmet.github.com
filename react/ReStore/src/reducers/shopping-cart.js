const updateShoppingCart = (state, action) => {
	if (state === undefined) {
		return {
			cartItems: [],
			orderTotal: 0,
		};
	}

	switch (action.type) {
		case 'BOOK_ADDED_TO_CART':
			return updateOrder(state, action.payload, 1);

		case 'BOOK_REMOVED_FROM_CART':
			return updateOrder(state, action.payload, -1);

		case 'ALL_BOOKS_REMOVED_FROM_CART':
			const item = state.shoppingCart.cartItems.find(
				({ id }) => id === action.payload
			);
			return updateOrder(state, action.payload, -item.count);

		default:
			return state.shoppingCart;
	}
};

const updateCartItems = (cartItems, item, index) => {
	if (item.count === 0) {
		return [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
	}
	if (index === -1) {
		return [...cartItems, item];
		
	} else {
		return [...cartItems.slice(0, index), item, ...cartItems.slice(index + 1)];
	}
};

const updateItem = (book, item = {}, quantity) => {
	const { id = book.id, title = book.title, count = 0, total = 0 } = item;

	return {
		id,
		title,
		count: count + quantity,
		total: total + book.price * quantity,
	};
};

const updateTotalSum = (cartItems) => {
	let initialValue = 0;
	const sum = cartItems.reduce(function (accumulator, currentValue) {
		return accumulator + currentValue.total;
	}, initialValue);

	return sum.toFixed(2);
}

const updateOrder = (state, bookId, quantity) => {

	const {
		booklist: { books },
		shoppingCart: { cartItems },
	} = state;

	const book = books.find((book) => book.id === bookId);
	const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
	const item = cartItems[itemIndex];
	const addedItem = updateItem(book, item, quantity);
	const updatedCart = updateCartItems(cartItems, addedItem, itemIndex);

	return {
		cartItems: updatedCart,
		orderTotal: updateTotalSum(updatedCart),
	};
};

export default updateShoppingCart;
