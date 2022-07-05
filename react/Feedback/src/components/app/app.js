import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../header';
import HomePage from '../../pages/homePage';
import AboutPage from '../../pages/aboutPage';
import { FeedbackProvider } from '../../context/feedbackContext';

import './app.css';

function App() {
	return (
		<FeedbackProvider>
			<Router>
				<Header />
				<div className='container'>
					<Routes>
						<Route path='/' element={<HomePage/>} />
						<Route path='/about' element={<AboutPage />} />
					</Routes>
				</div>
			</Router>
		</FeedbackProvider>
	);
}

export default App;
