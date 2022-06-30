import React, { Fragment } from 'react';

import './booklist-item.css';

const BookListItem = ({ book, onAddedItem }) => {
  const { title, author, price, imgSrc } = book;

  return (
		<Fragment>
			<span className='booklist__item-img'>
				<img src={imgSrc} alt='book cover' />
			</span>
			<span className='booklist__item-details'>
				<span className='booklist__item-details-title'>
					{title}
				</span>
				<span className='booklist__item-details-author'>{author}</span>
				<span className='booklist__item-details-price'>{price} €</span>
				<button onClick={onAddedItem} className='btn btn-info booklist__item-details-btn'>
					Add to cart
				</button>
			</span>
		</Fragment>
	);
}

export default BookListItem;