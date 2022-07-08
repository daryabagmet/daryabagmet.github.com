import {useContext} from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import AlertContext from '../context/alert/alertContext';

function Alert() {
  const { alert } = useContext(AlertContext);
  return (
			alert !== null && (
				<p className='flex items-center mb-4 space-x-2 text-rose-500'>
					<FaExclamationCircle />
					<strong>{alert.msg}</strong>
				</p>
			)
		);
}

export default Alert