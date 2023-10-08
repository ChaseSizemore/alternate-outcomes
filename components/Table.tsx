import React, { ChangeEvent, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dummyData from '@/utils/dummyOutcomes';

// export default function Example({outcomes}:any) {
//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-base font-semibold leading-6 text-gray-900">
//             Users
//           </h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A list of all the users in your account including their name, title,
//             email and role.
//           </p>
//         </div>
//         <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
//           {/* <button
//             type="button"
//             className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Add user
//           </button> */}
//         </div>
//       </div>
//       <div className="mt-8 flow-root">
//         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//             <table className="min-w-full divide-y divide-gray-300">
//               <thead>
//                 <tr>
//                   <th
//                     scope="col"
//                     className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
//                   >
//                     Bootcamp
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                   >
//                     Company
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                   >
//                     Position
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                   >
//                     Salary
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                   >
//                     YOE
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {outcomes.map((outcome:any) => (
//                   <tr key={outcome.email}>
//                     <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
//                       {outcome.bootcamp}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                       {outcome.company}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                       {outcome.position}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                       {outcome.salary}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                         {outcome.YOE}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

interface Column {
    id: 'bootcamp' | 'company' | 'position' | 'salary' | 'YOE';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

const columns: readonly Column[] = [
    { id: 'bootcamp', label: 'Bootcamp', minWidth: 170 },
    { id: 'company', label: 'Company', minWidth: 100 },
    { id: 'position', label: 'Position', minWidth: 170, align: 'right',},
    { id: 'salary', label: 'Salary', minWidth: 170, align: 'right'},
    {id: 'YOE',label: 'YOE',minWidth: 170,align: 'right',},
  ];

  const rows = dummyData;

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
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