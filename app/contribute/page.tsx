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
  const [positionError, setPositionError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [locationError] = useState(false);
  const [bootcampError] = useState(false);

  const [open, setOpen] = useState(false);

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
      <Modal  open={open} setOpen={setOpen} icon = {'error'} title = {'error'} message = {"There appears to be an error! Please resolve all field errors before submitting again."} />


    </div>
  );
}
