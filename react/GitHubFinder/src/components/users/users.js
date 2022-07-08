import { useContext} from 'react';
import Loader from '../loader';
import UserItem from './userItem';
import GithubContext from '../../context/github/githubContext';

function Users() {
  const { users, loading } = useContext(GithubContext);

  if(!loading) {
    return (
					<div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 text-center'>
						{users.map((user) => (
						  <UserItem key={user.id} user={user}/>
						))}
					</div>
				);
  }else {
    return (
     <Loader />
    )
  }

  
}

export default Users;