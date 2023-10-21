'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

// import dummyData from '@/utils/dummyOutcomes';

interface Column {
  id: 'bootcamp' | 'company' | 'position' | 'salary' | 'YOE';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string | number;
}

const columns: readonly Column[] = [
  { id: 'bootcamp', label: 'Bootcamp', minWidth: 150 },
  { id: 'company', label: 'Company', minWidth: 150 },
  { id: 'position', label: 'Position', minWidth: 150 },
  { id: 'salary', label: 'Salary', minWidth: 150},
  { id: 'YOE', label: 'Related YOE', minWidth: 150 },
];

export default function StickyHeadTable({ outcomes }: any) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState(outcomes);
  const [orderBy, setOrderBy] = useState('bootcamp');
  const [order, setOrder] = useState('asc');
  useEffect(() => {
    setRows(outcomes);
  }, [outcomes]);

  const createSortHandler = (columnId: string) => () => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);

    setRows((prevRows: any) => {
      const sortedRows = [...prevRows].sort((a, b) => {
        const aValue = columnId === 'salary' ? Number(a[columnId].replace(/[$,]/g, '')) : a[columnId];
        const bValue = columnId === 'salary' ? Number(b[columnId].replace(/[$,]/g, '')) : b[columnId];

        // Check if both values are numbers
        if (!isNaN(aValue) && !isNaN(bValue)) {
          return isAsc ? aValue - bValue : bValue - aValue;
        }

        // If only one value is a number, sort it first
        if (!isNaN(aValue)) {
          return isAsc ? -1 : 1;
        }
        if (!isNaN(bValue)) {
          return isAsc ? 1 : -1;
        }

        // If neither value is a number, use string comparison
        if (aValue < bValue) {
          return isAsc ? -1 : 1;
        }
        if (aValue > bValue) {
          return isAsc ? 1 : -1;
        }
        return 0;
      });
      return sortedRows;
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className="">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={
                      orderBy === column.id
                        ? (order as 'asc' | 'desc')
                        : undefined
                    }
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, key:number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key = {key}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
