import React from 'react'
import { Box, FormGroup, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { width } from '@mui/system';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';

export default function Shorts() {
    const [value, setValue] = React.useState([null, null]);

    return (
        <>
            <Box height={100} />
            {/* <div className="card w-50">
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
            </div> */}
           <div className='w-50 m-auto'>
           <FormGroup>
                <FormControl>
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
                    <textarea className="form-control mt-3" placeholder="Reason"></textarea>
                </FormControl>
               
                <FormControl>
                    <Button variant="contained" color="warning" className='mt-3'>Apply for leave</Button>
                </FormControl>

            </FormGroup>
           </div>
        </>
    )
}
