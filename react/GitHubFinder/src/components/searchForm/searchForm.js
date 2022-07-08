import { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';
import { searchUsers } from '../../context/github/githubActions';

function SearchForm() {
  const [text, setText] = useState('');

  const { users, dispatch } = useContext(GithubContext);

  const {setAlert} = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(text.trim() === '') {
      setAlert('Enter something in search field', 'error');
    }else {
      dispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
			dispatch({type:'GET_USERS', payload: users})
      setText('');
    }
  }

  return (
			<div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
				<div>
					<form className='form-control' onSubmit={handleSubmit}>
						<div className='relative'>
							<input
								type='text'
								className='input input-lg text-black w-full pr-40 bg-gray-200'
								placeholder='Search...'
								value={text}
								onChange={handleChange}
							/>
							<button
								type='submit'
								className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
							>
								Go
							</button>
						</div>
					</form>
				</div>
				<div>
					{users.length > 0 && (
						<button
							className='btn btn-ghost btn-lg'
							onClick={() => dispatch({ type: 'CLEAR_RESULTS' })}
						>
							Clear
						</button>
					)}
				</div>
			</div>
		);
}

export default SearchForm;