'use client';

import { useEffect, useState } from 'react';
import { states, bootcamps } from '@/utils/formSelects';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Modal from '@/components/Modal';

export default function Contribute() {
  const [bootcamp, setBootcamp] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [YOE, setYOE] = useState('');

  const [salaryError, setSalaryError] = useState(false);
  const [YOEError, setYOEError] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e: any) => {
    if (salaryError) {
      setModalIsOpen(true);
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const requestBody = {
      bootcamp: bootcamp,
      location: location,
      company: company,
      position: position,
      salary: salary,
      YOE: YOE,
    };
    axios
      .post('/api/outcomes', requestBody)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
    window.location.reload();
  };

  const handleSalaryChange = (e: any) => {
    const salaryValue = e.target.value;
    const salaryRegex = /^\d+$/;
    if (!salaryRegex.test(salaryValue)) {
      setSalaryError(true);
    } else {
      setSalaryError(false);
    }
    setSalary(salaryValue);
  };

  const handleYOEChange = (e: any) => {
    const YOEValue = e.target.value;
    const YOERegex = /^\d+$/;
    if (!YOERegex.test(YOEValue) || YOEValue > 20) {
      setYOEError(true);
    } else {
      setYOEError(false);
    }
    setYOE(YOEValue);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '200px' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="bootcamp"
            select
            label="Bootcamp"
            defaultValue=""
            helperText="Please select the bootcamp you attended"
            onChange={(e) => setBootcamp(e.target.value)}
          >
            {bootcamps.map((bootcamp, key) => (
              <MenuItem key={key} value={bootcamp}>
                {bootcamp}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="location"
            select
            label="Location"
            defaultValue=""
            helperText="Please select where you attended from"
            onChange={(e) => setLocation(e.target.value)}
          >
            {states.map((state, key) => (
              <MenuItem key={key} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          id="company"
          label="Company"
          onChange={(e) => setCompany(e.target.value)}
        />
        <TextField
          id="position"
          label="Position"
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          id="salary"
          label="Salary"
          onChange={handleSalaryChange}
          error={salaryError}
        />
        <TextField
          id="yoe"
          label="Years of Experience"
          onChange={handleYOEChange}
          error={YOEError}
        />
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outlined" onClick={resetForm}>
          Reset
        </Button>
      </Box>
      {/* <Modal modalIsOpen={modalIsOpen} /> */}
    </div>
  );
}
// <div className="flex items-center justify-center mt-10">
//   <form className="" onSubmit={logForm}>
//     <div className="space-y-12">
//       <div className="border-b border-gray-900/10 pb-12">
//         <h2 className="text-base font-semibold leading-7 text-gray-900">
//           Outcomes Form
//         </h2>
//         <p className="mt-1 text-sm leading-6 text-gray-600">
//           Input your Bootcamp outcome here!
//         </p>

//         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//           <div className="sm:col-span-3">
//             <label
//               htmlFor="bootcampName"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Bootcamp
//             </label>
//             <div className="mt-2">
//               <select
//                 id="bootcamp"
//                 name="bootcamp"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//               >
//                 {bootcamps.map((bootcamp, key) => (
//                   <option key={key}>{bootcamp}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="sm:col-span-3">
//             <label
//               htmlFor="companyName"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Location
//             </label>
//             <div className="mt-2">
//               <select
//                 id="location"
//                 name="location"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//               >
//                 {states.map((state, key) => (
//                   <option key={key}>{state}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="sm:col-span-4">
//             <label
//               htmlFor="company"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Company
//             </label>
//             <div className="mt-2">
//               <input
//                 id="company"
//                 name="company"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div className="sm:col-span-3">
//             <label
//               htmlFor="position"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Position Title
//             </label>
//             <div className="mt-2">
//               <input
//                 type="text"
//                 name="position"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div className="sm:col-span-3">
//             <label
//               htmlFor="salary"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Salary
//             </label>
//             <div className="mt-2">
//               <input
//                 type="text"
//                 name="salary"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div className="sm:col-span-3">
//             <label
//               htmlFor="YOE"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Prior Related Years Of Experience
//             </label>
//             <div className="mt-2">
//               <select
//                 id="YOE"
//                 name="YOE"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//               >
//                 <option>0-2</option>
//                 <option>2-5</option>
//                 <option>6 +</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="mt-6 flex items-center justify-end gap-x-6">
//       <button
//         type="button"
//         className="text-sm font-semibold leading-6 text-gray-900"
//       >
//         Cancel
//       </button>
//       <button
//         type="submit"
//         className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//       >
//         Submit
//       </button>
//     </div>
//   </form>
// </div>
