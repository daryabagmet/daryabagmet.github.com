import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from '../shared/card';
import FeedbackContext from '../../context/feedbackContext';
import './feedbackItem.css';

function FeedbackItem({ item }) {
	const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

	return (
		<Card>
			<div className='rating-display'>{item.rating}</div>
			<button onClick={() => deleteFeedback(item.id)} className='close'>
				<FaTimes color='purple' />
			</button>
			<button onClick={() => editFeedback(item)} className='edit'>
				<FaEdit color='purple' />
			</button>
			<div className='text-display'>{item.text}</div>
		</Card>
	);
}

FeedbackItem.propTypes = {
	item: PropTypes.object.isRequired,
};

export default FeedbackItem;
