import { makeStyles } from '@mui/styles';
import { FC, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Book } from '@/interface/book';

const useStyles = makeStyles((theme: { palette: { primary: { main: string } } }) => ({
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  },
  formInput: {
    width: '100%',
    margin: '10px 0'
  },
  modalActions: {
    padding: '0 24px 24px',
    justifyContent: 'space-between'
  }
}));

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (bookData: Book) => void;
  book: Book | null;
}

const BookModal: FC<BookModalProps> = ({ open, onClose, onSave, book = null }) => {
  const classes = useStyles();
  const { handleSubmit, control, reset, setValue, formState } = useForm<Book>();
  const { errors } = formState;

  const generateId = (min = 0, max = 1000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const onSubmit = (data: Book) => {
    onSave({ ...data, id: data.id || `${generateId()}-${generateId()}` });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (open) reset();

    if (!book) return;
    setValue('id', book.id);
    setValue('name', book.name);
    setValue('category', book.category);
    setValue('price', Number(book.price));
    setValue('description', book.description);
  }, [open, book, setValue]);

  return (
    <Dialog open={open} onClose={handleCloseModal} onBackdropClick={handleCloseModal}>
      <DialogTitle className={classes.dialogTitle}>{book ? 'Edit Book' : 'Add Book'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                className={classes.formInput}
                label="Name"
                variant="outlined"
                error={Boolean(errors.name)}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="price"
            defaultValue={''}
            control={control}
            rules={{ required: 'Price is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                className={classes.formInput}
                label="Price"
                variant="outlined"
                type="number"
                inputProps={{ min: 0 }}
                error={Boolean(errors.price)}
                helperText={errors.price ? errors.price.message : ''}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                className={classes.formInput}
                label="Category"
                variant="outlined"
                error={Boolean(errors.category)}
                helperText={errors.category ? errors.category.message : ''}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                className={classes.formInput}
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                error={Boolean(errors.description)}
                helperText={errors.description ? errors.description.message : ''}
              />
            )}
          />
        </DialogContent>
        <DialogActions className={classes.modalActions}>
          <Button onClick={handleCloseModal} color="inherit">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookModal;
