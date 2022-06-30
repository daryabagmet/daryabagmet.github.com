
export default class BookstoreService {
	data = [
		{
			id: 1,
			title: 'Designing Machine Learning Systems',
			author: 'Chip Huyen',
			price: 44,
			imgSrc: 'https://learning.oreilly.com/library/cover/9781491903063/250w/',
		},
		{
			id: 2,
			title: 'Fluent Python, 2nd Edition',
			author: 'Luciano Ramalho',
			price: 54.33,
			imgSrc: 'https://learning.oreilly.com/library/cover/9781492056348/250w/',
		},
		{
			id: 3,
			title: 'Learning Go',
			author: 'Jon Bodner',
			price: 43.82,
			imgSrc: 'https://learning.oreilly.com/library/cover/9781492077206/250w/',
		},
		{
			id: 4,
			title: 'Fundamentals of Software Architecture',
			author: 'Mark Richards, Neal Ford',
			price: 49.82,
			imgSrc: 'https://learning.oreilly.com/library/cover/9781492043447/250w/',
		},
		{
			id: 5,
			title: 'Software Engineering at Google',
			author: 'Titus Winters, Tom Manshreck, Hyrum Wright',
			price: 45.59,
			imgSrc: 'https://learning.oreilly.com/library/cover/9781492082781/250w/',
		},
		{
			id: 6,
			title: 'JavaScript: The Definitive Guide, 7th Edition',
			author: 'David Flanagan',
			price: 52.40,
			imgSrc: 'https://learning.oreilly.com/library/cover/9781491952016/250w/',
		},
	];

	getBooks() {
		return new Promise((resolve, reject) => {
			//for emulation real-time request
			
			setTimeout(() => {
				if (Math.random() > 0.75) {
					reject(new Error('Something went wrong'));
				} else {
					resolve(this.data);
				}
			}, 200);
		});
	}
}