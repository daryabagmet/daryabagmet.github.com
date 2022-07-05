export default class BookstoreService {
	getBooks() {
		return fetch(`/books`);
	}
}
