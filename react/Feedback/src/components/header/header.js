import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './header.css';

function Header({ text, aboutText }) {
	return (
		<header className='header'>
			<h2 className='header__title'>
				<Link to='/'>{text}</Link>
			</h2>
			<h5 className='header__subtitle'>
				<Link to='/about'>{aboutText}</Link>
			</h5>
		</header>
	);
}

Header.defaultProps = {
	text: 'Feedback App',
	aboutText: 'About service'
};

Header.propTypes = {
	text: PropTypes.string,
	aboutText: PropTypes.string,
};

export default Header;
