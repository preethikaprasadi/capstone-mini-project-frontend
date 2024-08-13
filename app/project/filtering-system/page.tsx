"use client";
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { getAllMatchingGuide } from "@/service/guide.service";
import { useMultiStepContext } from "@/app/step-context";
import { Button } from "@nextui-org/react";

const columns: GridColDef[] = [
    {
        field: 'fullName',
        headerName: 'Name',
        width: 200,
        editable: false,
    },
    {
        field: 'rating',
        headerName: 'Rating',
        type: 'number',
        width: 150,
        editable: false,
        resizable: false,
    },
    {
        field: 'reviewCount',
        headerName: 'Review Count',
        type: 'number',
        width: 150,
        editable: false,
        resizable: false,
    },
    {
        field: 'actions',
        headerName: '',
        width: 400,
        sortable: false,
        disableClickEventBubbling: true,
        resizable: false,
        renderCell: (params) => (
            <div>
                <Button
                    variant="solid"
                    color="primary"
                    style={{ marginRight: 8 }}
                    onClick={() => handleViewGuide(params)}
                >
                    View Guide Profile
                </Button>
                <Button
                    variant="solid"
                    color="success"
                    onClick={() => handleRequestGuide(params)}
                >
                    Request Guide
                </Button>
            </div>
        )
    },
];

export default function Filtering() {
    const { projectResponse } = useMultiStepContext();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (projectResponse?.id) {
            console.log("projectResponseID-------", projectResponse.id.toString());
            getAllMatchingGuide(projectResponse.id.toString()).then((res) => {
                console.log("fetch response: ", res);
                setRows(res);
            });
        }
    }, [projectResponse]);

    const handleViewGuide = (params) => {
        const guideId = params.row.id;
        console.log("Viewing guide profile for:", guideId);
        // Implement the logic to navigate to the guide's profile page or open a modal
    };

    const handleRequestGuide = (params) => {
        const guideId = params.row.id;
        console.log("Requesting guide for:", guideId);
        // Implement the logic to send a request to the guide
    };

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rowHeight={60}
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
