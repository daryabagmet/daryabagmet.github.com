import Card from '../../components/shared/card/card';
import './aboutPage.css';

function AboutPage(props) {
	return (
		<Card>
			<div className='about'>
				<h2>About This Project</h2>
				<p>This is a React app to leave feedback for a product or service</p>
			</div>
		</Card>
	);
}

export default AboutPage;
