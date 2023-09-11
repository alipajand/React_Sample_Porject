import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '@/interface/book';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [
    {
      id: 'custom-id',
      name: 'Sample Name',
      price: 100,
      category: 'Novel',
      description: 'This book is impressive'
    }
  ]
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    editBook: (state, action: PayloadAction<Book>) => {
      const { id } = action.payload;
      const existingBook = state.books.find((book) => book.id === id);

      if (existingBook) Object.assign(existingBook, action.payload);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    }
  }
});

export const { addBook, editBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;

export const selectBooks = (state: { books: BookState }) => state.books.books;
