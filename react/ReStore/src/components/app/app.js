import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../header';
import { HomePage, CartPage } from '../pages';

const App = () => {
	return (
		<main role='main' className='container'>
			<Header/>
			<Routes>
				<Route path='/' element={<HomePage />} exact />
				<Route path='/cart' element={<CartPage />} />
			</Routes>
		</main>
	);
};

export default App;
