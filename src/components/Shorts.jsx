import React from 'react'
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Shorts() {
    const [value, setValue] = React.useState([null, null]);

    return (
        <>
            <Box height={100} />
            <div className="card w-50">
                <div className="card-body">
                    <form>
                        <div className="row">

                            <div className="col">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className='m-2'
                                        label="From"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DatePicker
                                        className='m-2'
                                        label="To"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className='col-11'>
                                <textarea className="form-control mt-3" placeholder="Reason" />
                            </div>
                            <div>
                                <Button variant="outlined" className='mt-3' style={{ textTransform: "capitalize" }}>Apply for leave</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
