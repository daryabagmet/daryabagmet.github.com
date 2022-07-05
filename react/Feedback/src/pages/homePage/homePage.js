import FeedbackForm from '../../components/feedbackForm';
import RatingInfo from '../../components/rating/ratingInfo';
import FeedbackList from '../../components/feedbackList';

function HomePage() {
	return (
		<>
			<FeedbackForm />
			<RatingInfo />
			<FeedbackList />
		</>
	);
}

export default HomePage;
