import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default function DataTable({ columns, rows, setData, onDelete }) {

  const handleEditClick = (rowData) => {
    console.log('click')
    setData(rowData);
  };
  const handleDelete = (rowData) => {
    onDelete(rowData)
  }

  return (
    <Box sx={{ mx: 5, marginTop: 3 }}>
      <DataGrid
        rows={rows} // Usando rows desde props
        columns={[
          ...columns,
          {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            flex: 1,
            minWidth: 130,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => (
              <>
                <IconButton
                  color="primary"
                  aria-label="edit"
                  onClick={() => handleEditClick(params.row)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  aria-label="delete"
                  onClick={() => handleDelete(params.row)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ),
          }]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        autoHeight
      />
    </Box>
  );
}
