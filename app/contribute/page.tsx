'use client';

import { states, bootcamps } from '@/utils/formSelects';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Contribute() {
  const [bootcamp, setBootcamp] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [YOE, setYOE] = useState('');

  const [salaryError, setSalaryError] = useState(false);
  const [YOEError, setYOEError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [bootcampError, setBootcampError] = useState(false);

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleSubmit = (e: any) => {
    const hasErrors = salaryError || YOEError || positionError || companyError || locationError || bootcampError;
    const hasEmptyValues = !bootcamp || !location || !company || !position || !salary || !YOE;
    
    if (hasErrors || hasEmptyValues) {
      setOpen(true);
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
        if (res.status === 200 || res.status === 304) {
          window.location.replace('/outcomes');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSalaryChange = (e: any) => {
    const salaryValue = e.target.value;
    const salaryRegex = /^\d+$/;
    if (!salaryRegex.test(salaryValue) || salaryValue > 999999) {
      setSalaryError(true);
    } else {
      setSalaryError(false);
    }
    setSalary(salaryValue);
  };

  const handleYOEChange = (e: any) => {
    const YOEValue = e.target.value;
    const YOERegex = /^\d+$/;
    if (!YOERegex.test(YOEValue)) {
      setYOEError(true);
    } else {
      setYOEError(false);
    }
    setYOE(YOEValue);
  };

  const handlePositionChange = (e: any) => {
    const positionValue = e.target.value;
    if (positionValue.length > 40) {
      setPositionError(true);
    } else {
      setPositionError(false);
    }
    setPosition(positionValue);
  };

  const handleCompanyChange = (e: any) => {
    const companyValue = e.target.value;
    if (companyValue.length > 40) {
      setCompanyError(true);
    } else {
      setCompanyError(false);
    }
    setCompany(companyValue);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '200px' } }}
        noValidate
        autoComplete="off"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Outcomes Form
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Input your Bootcamp outcome here!
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <TextField
                  id="bootcamp"
                  select
                  label="Bootcamp"
                  defaultValue=""
                  // helperText="Please select the bootcamp you attended"
                  onChange={(e) => setBootcamp(e.target.value)}
                >
                  {bootcamps.map((bootcamp, key) => (
                    <MenuItem key={key} value={bootcamp}>
                      {bootcamp}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="sm:col-span-3">
                <TextField
                  id="location"
                  select
                  label="Location"
                  defaultValue=""
                  // helperText="Please select where you attended from"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {states.map((state, key) => (
                    <MenuItem key={key} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="sm:col-span-3">
                <TextField
                  id="company"
                  label="Company"
                  onChange={handleCompanyChange}
                  error={companyError}
                  helperText={
                    companyError ? 'Please enter less than 40 characters' : ''
                  }
                />
              </div>
              <div className="sm:col-span-3">
                <TextField
                  id="position"
                  label="Position"
                  onChange={handlePositionChange}
                  error={positionError}
                  helperText={
                    positionError ? 'Please enter less than 40 characters' : ''
                  }
                />
              </div>
              <div className="sm:col-span-3">
                <TextField
                  id="salary"
                  label="Salary"
                  onChange={handleSalaryChange}
                  error={salaryError}
                  helperText={salaryError ? 'Please enter numbers only' : ''}
                />
              </div>
              <div className="sm:col-span-3">
                <TextField
                  id="yoe"
                  label="Years of Experience"
                  onChange={handleYOEChange}
                  error={YOEError}
                  helperText={YOEError ? 'Please enter only numbers' : ''}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center sm:justify-end gap-x-6">
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="text" onClick={() => {window.location.reload()}}>
            Reset
          </Button>
        </div>
      </Box>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Submission Error!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          There appears to be an error! Please resolve all field
                          errors before submitting again.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
