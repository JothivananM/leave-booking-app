import { Box, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid-premium';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import EditUser from './EditUser';
// import Slide from '@mui/material/Slide';
import { deleteUser } from '../service/axios';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useConfirm } from "material-ui-confirm";
import Typography from '@mui/material/Typography';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Home() {
    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
    });
    const confirm = useConfirm();
    const [data, setData] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertUpdate, setOpenAlertUpdate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isNew, setIsNew] = useState(false);

    const handleSelectionChange = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
    };



    const handleDelete = (item) => {
        console.log(item);
        confirm({ description: `This will permanently delete ${item.username}.` })
            .then(() => deleteItem(item.id))
            .catch(() => console.log("Deletion cancelled."));
    };

    const deleteItem = (id) => {
        const newRows = data.filter((row) => row._id !== id);
        console.log(newRows);
        deleteUser(id);
        setOpenAlert(true);
        setData(newRows);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlertUpdate(false);
        setOpenAlert(false);
    };

    const getData = async () => {
        await axios.get("http://localhost:5000/")
            .then((res) => {
                setData(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
        console.log("useEffect");
    }, []);

    const columns = [
        { field: "name", headerName: "Avatar", width: 100, renderCell: params => <Avatar src={params.row.name} />, filterable: false, sortable: false },
        { field: "username", headerName: "Username", width: 200, editable: true },
        { field: "active", headerName: "Active", width: 100, editable: true, type: 'boolean' },
        { field: "email", headerName: "Email", width: 250, editable: true },
        { field: "phone", headerName: "Mobile", width: 250, editable: true },
        {
            field: 'actions', headerName: 'Actions', width: 250, renderCell: (params) => {
                return (
                    <>
                        <Stack direction="row" spacing={1}>
                            {
                                showEdit &&
                                <Button
                                    onClick={() => {
                                        setState({ isPaneOpen: true });
                                        setIsNew(false);
                                    }}
                                    variant="contained" size='small' startIcon={<ModeEditOutlinedIcon />}
                                >
                                    Edit
                                </Button>
                            }
                            <Button
                                onClick={() => handleDelete(params.row)}
                                variant="outlined" size='small' startIcon={<DeleteOutlineOutlinedIcon />}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </>

                );
            }
        }

    ]


    const rows = data.map(el => ({
        id: el._id,
        name: el.name,
        username: el.username,
        email: el.email,
        phone: el.phone,
        active: true
    }))

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    }

    const handleEditClick = (row) => {
        // setOpen(true);
        setShowEdit(true);
        setSelectedRow(row);
    };

    const closeSlide = (id, updatedData) => {
        setState({ isPaneOpen: false });
        if (id !== "id-01") {
            const updatedRows = data.map(row => {
                if (row._id === id) {
                    return {
                        ...row, name: updatedData.name,
                        username: updatedData.username,
                        phone: updatedData.phone,
                        email: updatedData.email
                    };
                }
                return row;
            });
            setData(updatedRows);
            setOpenAlertUpdate(true);
        } else {
            updatedData._id = (Date.now()).toString();
            setData([...data, updatedData]);
        }

    }

    return (
        <>
            <Box height={80} />
          
            <div>
                <DataGrid
                    autoHeight={true}
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

                    // checkboxSelection
                    onSelectionModelChange={handleSelectionChange}
                    selectionModel={selectionModel}
                    checkboxSelectionProps={{
                        disableSelectAll: true,
                    }}
                    rowsPerPage={rows.length}
                    disableMultipleSelection
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    onRowClick={(params) => handleEditClick(params.row)}
                />
            </div>
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Record deleted!
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertUpdate} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Record Updated!
                </Alert>
            </Snackbar>

            <SlidingPane
                className="some-custom-class"
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                from="right"
                width='40%'
                onRequestClose={() => {
                    setState({ isPaneOpen: false });
                }}
            >
                {/* <EditUser userDetails={selectedRow} onRequestClose={closeSlide} /> */}
                {
                    isNew ?
                        <EditUser userDetails={null} onRequestClose={closeSlide} /> :
                        <EditUser userDetails={selectedRow} onRequestClose={closeSlide} />
                }
            </SlidingPane>

            <Fab className="mt-3"
                color="primary"
                size="small"
                style={{ float: 'right', marginRight: "5rem", position: "static" }}
                onClick={() => {
                    setState({ isPaneOpen: true });
                    setIsNew(true);
                }}
                aria-label="add">
                <AddIcon />
            </Fab>
        </>


    )
}
