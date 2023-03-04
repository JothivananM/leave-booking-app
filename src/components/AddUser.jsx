import React, { useReducer, useState } from 'react';
import { Box, FormGroup, FormControl, Input, InputLabel, Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormReducer from '../reducer/FormReducer';
import { addUser } from '../service/axios';

export default function AddUser() {
    const initialState = {
        name: "",
        username: "",
        email: "",
        phone: ""
    };

    const [formData, dispatch] = useReducer(FormReducer, initialState);
    const [data, setData] = useState(initialState);
    const [inputValue, setInputValue] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleFormChange = (e) => {
        dispatch({
            type: "CHANGE INPUT",
            field: e.target.name,
            payload: e.target.value
        });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        addUser(formData);
        console.log(initialState);
        setData(initialState);

        event.preventDefault();
        console.log(`Submitted Name: ${name}, Email: ${email}`);
        setName('');
        setEmail('');
    }

    return (
        <>
            <Box height={70} />
            <div className='w-50 m-auto'>
                <FormGroup>
                    <Typography variant="h5">Add User</Typography>
                    <FormControl className="mt-3">
                        <InputLabel>Profile Picture</InputLabel> */
                         <Input name='name' defaultValue={data.name} onChange={handleFormChange} />
                        {/* <TextField
                            label="Profile Picture"
                            onChange={handleFormChange}
                        /> */}
                    </FormControl>
                    <FormControl className="mt-3">
                        <InputLabel>Username</InputLabel>
                        <Input name='username' defaultValue={data.username} onChange={handleFormChange} />
                    </FormControl>
                    <FormControl className="mt-3">
                        <InputLabel>Email</InputLabel>
                        <Input name='email' defaultValue={data.email} onChange={handleFormChange} />
                    </FormControl>
                    <FormControl className="mt-3">
                        <InputLabel>Phone</InputLabel>
                        <Input name='phone' defaultValue={data.phone} type='tel' onChange={handleFormChange} />
                    </FormControl>
                    <FormControl className="mt-3 w-10">
                        <Button variant="contained" type='submit' onClick={handleSubmit}>Add User</Button>
                    </FormControl>
                </FormGroup>
                {/* <form onSubmit={handleSubmit}>
                    <TextField
                        label="Profile Picture"
                        value={inputValue}
                        onChange={handleFormChange}
                    />
                    <TextField
                        label="Fullname"
                        value={inputValue}
                        onChange={handleFormChange}
                    />
                    <TextField
                        label="Email Addres"
                        value={inputValue}
                        onChange={handleFormChange}
                    />
                    <TextField
                        label="Mobile No"
                        value={inputValue}
                        onChange={handleFormChange}
                    />
                    <Button variant="contained" type='submit' onClick={handleSubmit}>Add User</Button>
                </form>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form> */}
            </div>
        </>
    )
}
