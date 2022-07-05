import { useState, useContext, useEffect } from 'react';
import RatingSelect from '../rating/ratingSelect';
import Card from '../shared/card';
import Button from '../shared/button';
import FeedbackContext from '../../context/feedbackContext';
import './feedbackForm.css';

function FeedbackForm() {
	const [text, setText] = useState('');
	const [rating, setRating] = useState(10);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState('');

	const { addFeedback, feedbackEdit, updateFeedback } =
		useContext(FeedbackContext);

	useEffect(() => {
		if (feedbackEdit.edit === true) {
			setBtnDisabled(false);
			setText(feedbackEdit.item.text);
			setRating(feedbackEdit.item.rating);
		}
	}, [feedbackEdit]);

	const handleTextChange = ({ target: { value } }) => { 
    if (value === '') {
      setBtnDisabled(true);
      setMessage(null);
      
    } else if (value.trim().length < 10) {
      setMessage('Text must be at least 10 characters');
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(value);
  }

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating,
			};

			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback);
			} else {
				addFeedback(newFeedback);
			}

			setBtnDisabled(true); 
			setRating(10); 
			setText('');
		}
	};

	return (
		<Card>
			<form className='feedback__form' onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={setRating} selected={rating} />
				<div className='form__input-group'>
					<input
						onChange={handleTextChange}
						type='text'
						placeholder='Write a review'
						value={text}
					/>
					<Button type='submit' isDisabled={btnDisabled}>
						Send
					</Button>
				</div>

				{message && <div className='feedback__form-message'>{message}</div>}
			</form>
		</Card>
	);
}

export default FeedbackForm;
