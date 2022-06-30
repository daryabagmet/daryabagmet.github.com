import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { bookRemovedFromCart, allBooksRemovedFromCart, bookAddedToCart } from '../../actions';
import './order.css';

const Order = ({ items, total, onIncrease, onDecrease, onDelete}) => {
  const iconTrash = <FontAwesomeIcon icon={faTrash} />;
  const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;
  const iconMinus = <FontAwesomeIcon icon={faMinusCircle} />;

	const renderRow = (item, idx) => {
		const { id, title, count, total } = item;

		return (
			<tr key={id}>
				<td>{idx + 1}</td>
				<td>{title}</td>
				<td>{count}</td>
				<td>€{total}</td>
				<td>
					<button
						onClick={() => {
							onIncrease(id);
						}}
						className='btn btn-outline-info order__table-btn'
					>
						{iconPlus}
					</button>
					<button
						onClick={() => {
							onDecrease(id);
						}}
						className='btn btn-outline-info order__table-btn'
					>
						{iconMinus}
					</button>
					<button
						onClick={() => {
							onDelete(id);
						}}
						className='btn btn-outline-info order__table-btn'
					>
						{iconTrash}
					</button>
				</td>
			</tr>
		);
	}

  return (
			<div className='order'>
				<table className='table order__table'>
					<thead>
						<tr>
							<th>#</th>
							<th>Item</th>
							<th>Count</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{items.map(renderRow)}
					</tbody>
				</table>

				<div className='order__total'>
					Total: € {total}
				</div>
			</div>
		);
}

const mapStateToProps = ({shoppingCart: { cartItems, orderTotal}}) => {
	return {
		items: cartItems,
		total: orderTotal
	}
}

const mapDispatchToProps = {
	onIncrease: bookAddedToCart,
	onDecrease: bookRemovedFromCart,
	onDelete: allBooksRemovedFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);