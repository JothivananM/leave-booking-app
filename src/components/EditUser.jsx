import React, { useState } from 'react';
import { Box, FormGroup, FormControl, Input, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { Document, Page } from "react-pdf";
import Fab from '@mui/material/Fab';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import FileBase from 'react-file-base64';

// import FormReducer from '../reducer/FormReducer';
import { addUser, updateUser } from '../service/axios';

export default function EditUser(props) {
    // console.log(props)
    // console.log("props",props.userDetails);
    let initialState = {
        name: '',
        username: '',
        email: '',
        phone: ''
    };

    if (props.userDetails != null) {
        initialState = {
            name: props.userDetails.name,
            username: props.userDetails.username,
            email: props.userDetails.email,
            phone: props.userDetails.phone
        };
    }

    const [formData, setFormData] = useState(initialState);
    const [validFullname, setValidFullname] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validMobile, setValidMobile] = useState(true);
    const [imagePreview, setImagePreview] = useState("");
    const [validFormDetails, setValidformDetails] = useState(false);

    // const [formData, dispatch] = useReducer(FormReducer, initialState);
    let fullnameRegex = /^[a-zA-Z\s]{5,}(?:\s{1,2}[a-zA-Z]{1,})?$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;


    const checkFullname = (e) => {
        let inputValue = e.target.value;
        if (fullnameRegex.test(inputValue)) {
            setValidFullname(true);
            setValidformDetails(true)
            console.log(validFullname);
        } else {
            setValidFullname(false);
            setValidformDetails(false)
        }
    }

    const checkEmail = (e) => {
        let inputValue = e.target.value;
        if (emailRegex.test(inputValue)) {
            setValidEmail(true);
            setValidformDetails(true)
            console.log(validEmail);
        } else {
            setValidEmail(false);
            setValidformDetails(false)
        }
    }

    const checkMobile = (e) => {
        let inputValue = e.target.value;
        if (mobileRegex.test(inputValue)) {
            setValidMobile(true);
            setValidformDetails(true)
            console.log(validMobile);
        } else {
            setValidMobile(false);
            setValidformDetails(false)
        }
    }

    const handleImageUpload = (base64Image) => {
        setImagePreview(base64Image);
        setFormData({
            ...formData,
            name: base64Image
        })
    };

    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handlePdfLoad = ({ numPages }) => {
        setNumPages(numPages);
    };

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();

    //     reader.onload = (event) => {
    //         setImagePreview(event.target.result);
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    const setImageData = (binaryValue) => {
        alert()

        console.log("NAME", formData);

    }

    const updateData = (e) => {
        e.target.name &&
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        // console.log("NAME",formData);

    }
    const handleSubmit = () => {
        if (validFormDetails) {
            if (props.userDetails) {
                // alert("Update")
                updateUser(props.userDetails.id, formData);
                props.onRequestClose(props.userDetails.id, formData);
            } else {
                // alert("Add");
                // addUser(formData);
                console.log(formData);
                props.onRequestClose("id-01", formData);
            }
        }
        else {
            alert('Not Allowed');
        }
    }
    // const handleFormChange = (e) => {
    //     dispatch({
    //         type: "CHANGE INPUT",
    //         field: e.target.name,
    //         payload: e.target.value
    //     });
    // }

    return (
        <>
            <Box height={10} />
            <FormGroup>

                <FormControl className="mt-3">
                    <InputLabel>Fullname</InputLabel>
                    <Input name='username' defaultValue={initialState.username} onChange={updateData} onBlur={checkFullname} required />
                    {
                        !validFullname &&
                        <p style={{ marginBottom: '0%', fontSize: '.8rem' }}>Name must contain atleast 5 characters including alphabets and space.</p>
                    }
                </FormControl>
                <FormControl className="mt-3">
                    <InputLabel>Email</InputLabel>
                    <Input name='email' defaultValue={initialState.email} onChange={updateData} onBlur={checkEmail} required />
                    {
                        !validEmail &&
                        <p style={{ marginBottom: '0%', fontSize: '.8rem' }}>Invalid email.</p>
                    }
                </FormControl>
                <FormControl className="mt-3">
                    <InputLabel>Phone</InputLabel>
                    <Input name='phone' defaultValue={initialState.phone} type='number' onChange={updateData} onBlur={checkMobile} required />
                    {
                        !validMobile &&
                        <p style={{ marginBottom: '0%', fontSize: '.8rem' }}>Invalid Phone no.</p>
                    }
                </FormControl>
                <FormControl className="mt-3">
                    {/* <InputLabel>Profile Picture</InputLabel> */}
                    {/* <Input name='name' id='name' defaultValue={initialState.name} onChange={updateData} /> */}
                    {/* <Input name='name' id='name' defaultValue={initialState.name} onChange={updateData}
                        type="file" accept="image/*" onChange={handleImageUpload}
                    /> */}

                    <label>Profile Picture</label>
                    <div className='d-flex justify-content-between'>

                        <FileBase
                            id="raised-button-file"
                            type="pdf"
                            onDone={({ base64 }) => handleImageUpload(base64)}
                        >
                        </FileBase>

                        {/* <label htmlFor="raised-button-file">
                            <Fab
                                variant="raised" component="span"
                                className='mt-1'
                                color='primary'
                                size='small'
                            >
                                <AddPhotoAlternateRoundedIcon />
                            </Fab>
                        </label> */}

                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: "40%" }} />
                        )}

                    </div>
                </FormControl>
                {/* <FormControl>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} />
                    {file && (
                        <Document file={file} onLoadSuccess={handlePdfLoad}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                            ))}
                        </Document>
                    )}
                </FormControl> */}
                <FormControl className="mt-3 w-10">
                    {
                        props.userDetails ?
                            <Button
                                variant="contained"
                                size="small"
                                type='submit'
                                style={{ width: "10%" }}
                                onClick={handleSubmit}>Update</Button> :
                            <Button
                                variant="contained"
                                size="small"
                                type='submit'
                                style={{ width: "10%" }}
                                onClick={handleSubmit}>Add</Button>
                    }

                </FormControl>
            </FormGroup>
        </>
    )
}
