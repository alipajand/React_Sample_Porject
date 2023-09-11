import { FC, useState } from 'react';
import { Book } from '@/interface/book';
import { Button, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, deleteBook, editBook, selectBooks } from '@/redux/bookSlice';
import BookModal from '@/components/BookModal';
import BookList from '@/components/BookList';

const HomePage: FC = () => {
  const dispatch = useDispatch();
  const books: Book[] = useSelector(selectBooks);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleAddBook = () => {
    setIsAddModalOpen(true);
    setSelectedBook(null);
  };

  const handleEditBook = (book: Book) => {
    setIsEditModalOpen(true);
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedBook(null);
  };

  const handleSaveBook = (bookData: Book) => {
    if (selectedBook) {
      dispatch(editBook({ ...selectedBook, ...bookData }));
    } else {
      dispatch(addBook(bookData));
    }

    handleCloseModal();
  };

  const handleDeleteBook = (id: string) => {
    dispatch(deleteBook(id));
  };

  return (
    <Container>
      <Typography variant="h1" gutterBottom style={{ fontSize: '50px' }}>
        Book Store
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddBook}>
        Add Book
      </Button>

      <BookList books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} />

      <BookModal
        open={isAddModalOpen || isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBook}
        book={selectedBook}
      />
    </Container>
  );
};

export default HomePage;
