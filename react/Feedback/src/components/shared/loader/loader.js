import './loader.css';

function Loader() {
	return (
		<div className='loader-container'>
			<div className='loader'>
				<div className='square'></div>
				<div className='square'></div>
				<div className='square last'></div>
				<div className='square clear'></div>
				<div className='square'></div>
				<div className='square last'></div>
				<div className='square clear'></div>
				<div className='square '></div>
				<div className='square last'></div>
			</div>
		</div>
	);
}

export default Loader;
