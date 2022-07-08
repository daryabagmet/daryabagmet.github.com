import React from 'react';
import SearchForm from '../components/searchForm/searchForm';
import Users from '../components/users';

function HomePage() {
  return (
			<div className=''>
				<SearchForm />
				<Users />
			</div>
		);
}

export default HomePage;