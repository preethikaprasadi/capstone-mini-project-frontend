"use client";
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef,GridToolbar } from '@mui/x-data-grid';
import { getAllMatchingGuide } from "@/service/guide.service";
import { useMultiStepContext } from "@/app/step-context";

const columns: GridColDef[] = [

    {
        field: 'fullName',
        headerName: 'Name',
        width: 200,
        editable: true,
    },
    {
        field: 'rating',
        headerName: 'Rating',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'reviewCount',
        headerName: 'Review Count',
        type: 'number',
        width: 150,
        editable: true,
    },
];

export default function Filtering() {
    const { projectResponse } = useMultiStepContext();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (projectResponse.id) {
            console.log("projectResponseID-------",projectResponse.id.toString());
            getAllMatchingGuide(projectResponse.id.toString()).then((res) => {
                console.log("fetch response: ", res);
                setRows(res);
            });
        }
    }, [projectResponse]);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rowHeight={40}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                disableColumnSelector
                slots={{
                    toolbar: GridToolbar,
                }}
            />
        </Box>
    );
}