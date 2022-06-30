import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './header.css';

const Header = ({ shoppingCart: { cartItems, orderTotal } }) => {
	const iconCart = <FontAwesomeIcon icon={faShoppingCart} />;
	const numItems = cartItems.length;
	const total = orderTotal;

	return (
		<header className='header row'>
			<Link className='header__logo text-dark' to='/'>
				<h1 className='header__logo-title'>ReStore</h1>
			</Link>
			<Link className='header__cart' to='/cart'>
				{iconCart}
				{numItems} items (${total})
			</Link>
		</header>
	);
};

const mapStayToProps = ({ shoppingCart }) => {
	return { shoppingCart }
};

export default connect(mapStayToProps)(Header);