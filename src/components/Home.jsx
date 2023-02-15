import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid-premium';

export default function Home() {

    const [data, setData] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);

    const handleSelectionChange = (newSelection) => {
        setSelectionModel(newSelection.selectionModel);
    };

    const getData = async () => {
        await axios.get("https://jsonplaceholder.typicode.com/users/")
            .then((res) => {
                setData(res.data);
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
        { field: "name", headerName: "Name", width: 150 },
        { field: "username", headerName: "Username", width: 150 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "phone", headerName: "Mobile", width: 150 },
        { field: "website", headerName: "Website", width: 150 },
        { field: "city", headerName: "City", width: 150, editable: true },
        { field: "street", headerName: "Street", width: 150 },
        { field: "cmpName", headerName: "Company name", width: 150 }
    ]

    const rows = data.map(el => ({
        id: el.id,
        name: el.name,
        username: el.username,
        email: el.email,
        phone: el.phone,
        website: el.website,
        city: el.address.city,
        street: el.address.street,
        cmpName: el.company.name
    }))

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    }


    return (
        <>
            <Box height={100} />
            <div>
                <DataGrid
                    autoHeight={true}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
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
                />
            </div>
        </>
    )
}
