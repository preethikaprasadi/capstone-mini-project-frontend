import { getAllMatchingGuide } from "@/service/guide.service";
import React, { useEffect, useState } from 'react';
import { getRequestsByGuide } from "@/service/project.request.service";
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import {Button} from "@nextui-org/react";
import Typography from '@mui/material/Typography';

export default function Notification() {
    const [rows, setRows] = useState([]);
    const { data: session } = useSession();
    const id = session?.user?.id;

    const columns: GridColDef[] = [
        {
            field: 'order',
            headerName: '',
            width: 50,
            editable: false,
            renderCell: (params) => (

                    <Typography variant="body2" sx={{ marginTop: '19px ',paddingBottom: '10px' }}>
                        {params.value}
                    </Typography>

            ),
        },
        {
            field: 'projectTitle',
            headerName: '', // Empty header name
            width:200,
            editable: false,
            hideable: false, // Prevent hiding from the toolbar
            renderCell: (params) => (
                <Box
                    display="flex"
                    flexDirection="column" // Stack content vertically
                    justifyContent="center" // Center content vertically within the cell
                    sx={{ marginTop: '18px' ,border: 0 ,borderColor:'transparent'}}
                >
                    <Typography variant="body2" sx={{ paddingBottom: '10px' ,borderColor:'transparent'}}>
                        {params.row.projectTitle} {/* First row content: Project Title */}
                    </Typography>
                    <Button
                        variant="flat"
                        color="primary"
                        size="small"
                        sx={{ paddingBottom: '10px',border: 0,borderColor:'transparent' }}
                        onClick={() => handleViewMoreDetails(params.row)} // Handle button click
                    >
                        More Info
                    </Button>
                </Box>
            ),
        }
    ];

    const handleViewMoreDetails = (row) => {
        // Add your logic to handle the "More Info" button click here
        console.log("More Info clicked for row: ", row);
    };

    useEffect(() => {
        if (id) {
            console.log("GuideID-------", id);
            getRequestsByGuide(id.toString()).then((res) => {
                console.log("fetch response: ", res);

                // Add order number to each row
                const rowsWithOrder = res.map((row, index) => ({
                    ...row,
                    order: index + 1,
                }));

                setRows(rowsWithOrder);
            });
        }
    }, [id]);

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                sx={{

                    '& .MuiDataGrid-root': {
                        borderColor:'transparent'// Outer border of the DataGrid
                    },

                    '& .MuiDataGrid-columnHeaders': {
                        borderColor: 'transparent',
                        border:0,
                    },
                    '& .MuiDataGrid-columnsContainer': {
                        borderColor: 'transparent', // Columns container border color
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        color: 'transparent', // Separator line color between columns
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'transparent', // Disables background color on hover
                    },

                    '& .MuiDataGrid-columnHeaders': {
                    display: 'none', // Ensures that the column header row is not displayed
                },


                }}

                rowHeight={100}
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                disableColumnSelector
                hideFooter  // Hides the footer if present
                hideHeader ={true} // Hides the header if present
            />
        </Box>
    );
}
