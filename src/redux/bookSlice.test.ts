import { configureStore, Store } from '@reduxjs/toolkit';
import { RootState } from './store';
import bookReducer, { addBook, deleteBook, editBook } from './bookSlice';
import { Book } from '@/interface/book';

describe('Book Reducer', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        books: bookReducer
      }
    });
  });

  it('should handle adding a book', () => {
    const bookToAdd: Book = {
      id: 'new-id',
      name: 'New Book',
      price: 200,
      category: 'Fiction',
      description: 'A new book to add'
    };

    store.dispatch(addBook(bookToAdd));

    const state: RootState = store.getState();

    expect(state.books.books).toContainEqual(bookToAdd);
  });

  it('should handle editing a book', () => {
    const existingBook: Book = {
      id: 'existing-id',
      name: 'Existing Book',
      price: 150,
      category: 'Mystery',
      description: 'An existing book'
    };

    const updatedBook: Book = {
      id: 'existing-id',
      name: 'Updated Book',
      price: 175,
      category: 'Fantasy',
      description: 'An updated book'
    };

    store.dispatch(addBook(existingBook));
    store.dispatch(editBook(updatedBook));

    const state: RootState = store.getState();

    expect(state.books.books).toContainEqual(updatedBook);
  });

  it('should handle deleting a book', () => {
    const bookToDelete: Book = {
      id: 'delete-id',
      name: 'Book to Delete',
      price: 120,
      category: 'Adventure',
      description: 'A book to delete'
    };

    store.dispatch(addBook(bookToDelete));
    store.dispatch(deleteBook(bookToDelete.id));

    const state: RootState = store.getState();

    expect(state.books.books.some((book) => book.id === bookToDelete.id)).toBe(false);
  });
});
