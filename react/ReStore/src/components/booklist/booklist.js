import React, { Component } from 'react';
import BookListItem from '../booklist-item';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import Loader from '../loader';
import ErrorIndicator from '../error-indicator';

import './booklist.css';

const Booklist = ({ books, onAddedItem }) => {
	return (
		<ul className='booklist'>
			{books.map((book) => {
				return (
					<li key={book.id} className='booklist__item'>
						<BookListItem book={book} onAddedItem={()=> { onAddedItem(book.id)} } />
					</li>
				);
			})}
		</ul>
	);
};

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedItem } = this.props;

    if(loading) {
      return <Loader/>
    }

    if(error) {
      return <ErrorIndicator />
    }

    return <Booklist books={books} onAddedItem={ onAddedItem} />;
  }
}

const mapStateToProps = ({booklist: { books, loading, error }}) => {
  return { books, loading, error };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
	return bindActionCreators({
		fetchBooks: fetchBooks(bookstoreService),
    onAddedItem: bookAddedToCart
	}, dispatch);
};

export default compose(
	withBookstoreService(),
	connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);