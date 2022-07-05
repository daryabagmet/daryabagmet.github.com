import { useContext } from 'react';
import FeedbackContext from '../../context/feedbackContext';

function RatingInfo() {
	const { feedback } = useContext(FeedbackContext);

	const average =
		(feedback.reduce((acc, { rating }) => acc + rating, 0) / feedback.length).toFixed(1);

	return (
		<div className='rating__info'>
			<h4 className='rating__info-text'>{feedback.length} Reviews</h4>
			<h4 className='rating__info-text'>
				Average Rating: {isNaN(average) ? 0 : average}
			</h4>
		</div>
	);
}

export default RatingInfo;
