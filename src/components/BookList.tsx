import { FC, useState } from 'react';
import { Book } from '@/interface/book';
import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import ConfirmationDialog from '@/components/ConfirmationDialog';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookList: FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  const [openDialog, toggleDialog] = useState(false);
  const [selected, setSelected] = useState<string>('');

  const handleEditBook = (details: { row: Book }) => {
    onEdit(details.row);
  };

  const handleDeleteBook = (details: { row: Book }) => {
    setSelected(details.row.id);
    toggleDialog(true);
  };

  const renderCellActions = (params: GridRenderCellParams<any, string>) => {
    return (
      <>
        <Button type="button" onClick={() => handleEditBook(params)}>
          Edit
        </Button>
        <Button color="error" onClick={() => handleDeleteBook(params)}>
          Delete
        </Button>
      </>
    );
  };

  const columns: GridColDef[] = [
    { field: 'row', align: 'center', headerAlign: 'center', headerName: '#', width: 70 },
    { field: 'name', minWidth: 200, headerName: 'Name' },
    { field: 'price', headerName: 'Price' },
    { field: 'category', align: 'center', headerAlign: 'center', headerName: 'Category' },
    { field: 'description', headerName: 'Description', sortable: false, flex: 1 },
    {
      field: 'action',
      type: 'actions',
      minWidth: 160,
      headerName: 'Action',
      sortable: false,
      renderCell: renderCellActions
    }
  ];

  return (
    <div style={{ height: 400, width: '100%', margin: '24px 0' }}>
      <DataGrid
        rows={books.map((item, index) => ({ ...item, row: index + 1 }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={handleEditBook}
      />

      <ConfirmationDialog
        open={openDialog}
        onClose={() => toggleDialog(false)}
        onConfirm={() => {
          if (selected) onDelete(selected);
          setSelected('');
          toggleDialog(false);
        }}
        title="Confirmation"
        content="Are you sure you want to delete this book?"
      />
    </div>
  );
};

export default BookList;
