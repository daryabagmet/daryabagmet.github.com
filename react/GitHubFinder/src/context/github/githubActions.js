import axios from 'axios';
const GithubAPI = 'https://api.github.com';
//const GithubToken = 'YOUR_TOKEN';

const github = axios.create({
	baseURL: GithubAPI,
	// headers: {
	// 	Authorization: `token ${GithubToken}`,
	// }
});

export const searchUsers = async (text) => {
	const params = new URLSearchParams({
		q: text,
	});

	const result = await github.get(`/search/users?${params}`);

  return result.data.items

};

export const getUserData = async(login) => {
  const [ user, repos ] = await Promise.all([
			github.get(`/users/${login}`),
			github.get(`/users/${login}/repos`)
		])

    return { user: user.data, repos: repos.data}
}

