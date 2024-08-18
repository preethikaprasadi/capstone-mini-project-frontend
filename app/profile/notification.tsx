import { getAllMatchingGuide } from "@/service/guide.service";
import React, { useEffect, useState } from 'react';
import { getRequestsByGuide } from "@/service/project.request.service";
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
export default function Notification() {
    const [rows, setRows] = useState([]);
    const { data: session } = useSession();
    const id = session?.user?.id;

    const column: GridColDef[] = [
        {
            field: 'order',
            headerName: '',
            width: 10,
            editable: false,
        },
        {
            field: 'projectTitle',
            headerName: '', // Empty header name
            width: 300,
            editable: false,
             hideable: false, // Prevent hiding from the toolbar
            renderCell: (params) => (
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                >
                    <div>{params.value}</div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleViewMoreDetails(params.row)}
                    >
                        View More Details
                    </Button>
                </Box>
            ),
        }
    ];

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
                rowHeight={70}
                rows={rows}
                columns={column}
                disableRowSelectionOnClick
                disableColumnSelector
                hideFooter  // Hides the footer if present
                hideHeader

            />
        </Box>
    );
}
