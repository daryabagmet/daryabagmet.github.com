import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';
import UserPage from './pages/userPage';
import NotFoundPage from './pages/notFoundPage';
import Footer from './components/footer';
import { GithubProvider } from './context/github/githubContext';
import { AlertProvider} from './context/alert/alertContext';
import Alert from './components/alert';

function App() {
  return (
			<GithubProvider>
				<AlertProvider>
					<Router>
						<div className='flex flex-col justify-between h-screen'>
							<Navbar />
							<main className='container mx-auto px-3 pb-12'>
								<Alert />
								<Routes>
									<Route exact path='/' element={<HomePage />} />
									<Route path='/about' element={<AboutPage />} />
									<Route path='users/:login' element={<UserPage />} />
									<Route path='/notfound' element={<NotFoundPage />} />
								</Routes>
							</main>
							<Footer />
						</div>
					</Router>
				</AlertProvider>
			</GithubProvider>
		);
}

export default App;
