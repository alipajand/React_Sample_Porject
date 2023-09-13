import { store } from './store'; // Adjust the import path as needed
import { addBook, deleteBook } from './bookSlice';
import { Book } from '@/interface/book'; // Import your Redux actions if needed

describe('Redux Store', () => {
  it('should add a book to the state', () => {
    const initialState = store.getState();
    const bookToAdd: Book = {
      id: 'custom-id',
      name: 'Sample Name',
      price: 100,
      category: 'Novel',
      description: 'This book is impressive'
    };

    store.dispatch(addBook(bookToAdd));

    const updatedState = store.getState();
    expect(updatedState.books.books).toHaveLength(initialState.books.books.length + 1);
    expect(updatedState.books.books[0]).toEqual(bookToAdd);
  });

  it('should remove a book from the state', () => {
    const initialState = store.getState();
    const bookToRemove = initialState.books.books[0];

    store.dispatch(deleteBook(bookToRemove.id));

    const updatedState = store.getState();
    expect(updatedState.books.books).toHaveLength(initialState.books.books.length - 1);
    expect(updatedState.books.books).not.toContainEqual(bookToRemove);
  });
});
