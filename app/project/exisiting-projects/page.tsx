"use client";
import React, { useEffect, useState } from 'react';
import {
    acceptRequest,
    getFinalStatusOfProject,
    getRequestsByGuide,
    rejectRequest
} from "@/service/project.request.service";
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import {Button} from "@nextui-org/react";
import Typography from '@mui/material/Typography';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {findByStudentId} from "@/service/project.service";
import {Link} from "@nextui-org/react";
import FormFirstStep from "@/app/project/form-first-step-1";
import FormSecondStep2 from "@/app/project/form-second-step-2";
import FormThirdStep3 from "@/app/project/form-third-step-3";

const CustomNoRowsOverlay = () => {
    console.log('CustomNoRowsOverlay rendered');
    return (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ padding: 2 }}>
            No Requests
        </Typography>
    );
};

const HandleStatusButton =  (r) => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            if (r) {
                const result = await getFinalStatusOfProject(r.r.toString()); // Call the async function
                setStatus(result); // Set the status state
            }
        };

        fetchStatus();
    }, [r]);


    switch (status) {
        case 'accepted':
            return (
                <>
                    <Button className={"w-80"}
                            size="small"
                            color="success"
                    >
                        Accepted
                    </Button>

                    <Link href="#" underline="always" color="success">View Guide Profile</Link>
                </>
            )
        case 'rejected':
            return (
                <>
                    <Button className={"w-80"}
                            size="small"
                            color="danger"
                    >
                        Rejected
                    </Button>

                    <Link href="#" underline="always" color="danger">Find a Guide</Link>
                </>
            )
        case 'noRequests':
            return (
                <>
                    <Button className={"w-80"}
                            size="small"
                            color="primary"
                    >
                        Still  Not Requested
                    </Button>

                    <Link href="#" underline="always" color="primary">Find a Guide</Link>
                </>
            )

        default:
            return (
                <>
                    <Button className={"w-80"}
                            size="small"
                            color="warning"
                    >
                        Pending
                    </Button>

                    <Link href="#" underline="always" color="warning">View Guide Profile</Link>
                </>
            )
    }


};


export default function Notification() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [rows, setRows] = useState([]);
    const [response, setResponse] = useState("");
    const { data: session } = useSession();
    const id = session?.user?.id;

    const columns: GridColDef[] = [
        {
            field: 'order',
            headerName: '',
            width: 60,
            editable: false,
            renderCell: (params) => (


                <Typography variant="body2" sx={{ marginTop: '42px ',marginLeft:'20px',paddingBottom: '10px',fontSize: '18px', fontWeight: 600 }}>
                    {params.value+"."}
                </Typography>

            ),
        },
        {
            field: 'title',
            headerName: '', // Empty header name
            flex: 1,
            editable: false,
            hideable: false, // Prevent hiding from the toolbar
            renderCell: (params) => (

                <Box
                    display="flex"
                    flexDirection="row" // Arrange items horizontally
                    justifyContent="space-between" // Distribute space between title and button
                    alignItems="flex-start" // Align items at the top of the row
                    sx={{ marginTop: '20px',marginLeft: '5px', padding: '20px', border: 0, borderColor: 'transparent',marginRight: '50px' }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}

                    >
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, fontSize: '20px',marginLeft: '3px' }}
                        >
                            {params.row.title} {/* Project Title */}
                        </Typography>
                        <Box
                            sx={{ width:"100%"  }}
                            display="flex"
                            flexDirection="column" // Arrange items horizontally
                            justifyContent="space-between" // Distribute space between title and button
                            alignItems="flex-start"
                            gap={2}>
                            <HandleStatusButton r={params.row.id}/>
                        </Box>
                        {/*<Button*/}
                        {/*    size="small"*/}
                        {/*    color="success"*/}
                        {/*    sx={{  padding: 0, border: 0, borderColor: 'transparent' }}*/}
                        {/*    onClick={() => handleViewMoreDetails(params.row)}*/}
                        {/*>*/}
                        {/*    Accepted*/}
                        {/*</Button>*/}

                        {/*<Link href="#" underline="always" color="success">View Guide Profile</Link>*/}

                    </Box>
                    <Box >

                        <Button
                            className={"bg-white/20"}
                            variant="flat"
                            size="lg"

                            onClick={() => handleViewMoreDetails(params.row)}
                        >
                            See More Info
                        </Button>
                    </Box>

                </Box>
            ),
        }

    ];

    const handleViewMoreDetails = (row) => {
        {onOpen()}
        setResponse(row);
        console.log("More Info clicked for row: ", row);
    };


    const handleAcceptRequest = async () => {
        if (response?.id) {
            try {
                const res= await acceptRequest(response.id); // Call acceptRequest with the ID
                onOpenChange(false); // Close the modal
                console.log("accepted request's response:",res)
                // Update the UI or refresh data if needed
            } catch (error) {
                console.error("Failed to accept the request:", error);
            }
        }
    };



    const handleRejectRequest = async () => {
        if (response?.id) {
            try {
                const res =await rejectRequest(response.id); // Call rejectRequest with the ID
                onOpenChange(false); // Close the modal
                console.log("rejected request's response:",res)
                // Update the UI or refresh data if needed
            } catch (error) {
                console.error("Failed to reject the request:", error);
            }
        }
    };

    useEffect(() => {
        if (id) {
            console.log("StudentID-------", id);
            findByStudentId(id.toString()).then((res) => {
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

        <> <Modal className={"max-w-2xl h-4/5 p-5 pt-3"} classNames={{
            body: "py-6",
            base: "border-[#52525B] bg-[#18181B] dark:bg-[#18181B]" ,
            backdrop: "bg-[#09090b]/90 backdrop-opacity-40",

        }} isOpen={isOpen} onOpenChange={onOpenChange}  style={{ zIndex: 1300 }}
        >
            <ModalContent >
                {(onClose) => (

                    <>

                        <ModalBody
                        >
                            <div className={"text-3xl font-bold mb-3"}>{response.projectTitle}
                            </div>
                            <div className={"h-3/4"}>

                                <h1>Project Summary:</h1>
                                <div className={"border-1 rounded-lg border-slate-600 h-full pt-1 pl-3 mt-2 "}>
                                    <p>
                                        {response.projectSummary}
                                    </p>
                                </div>
                            </div>
                            <p>
                                <br />
                                For further discussion or to provide guidance, please feel free to reach out to the student
                                directly via email at <a href={`mailto:${response.studentEmail}`} style={{ color: '#3b82f6' }}>{response.studentEmail}</a>.
                            </p>


                        </ModalBody>
                        <div className={"flex flex-col gap-3 "}>
                            <div className={" mr-5 ml-5"}>
                                <Button className={"w-full font-semibold "} color="default" onPress={onClose} >
                                    Request Project Proposal
                                </Button>
                            </div>
                            <div className={"flex flex-row justify-center mb-5 mr-5 ml-5 gap-2"}>
                                <div className={"w-1/2"}>
                                    <Button className={"w-full font-semibold"} color="success" onPress={handleAcceptRequest}>
                                        Accept Request
                                    </Button>

                                </div>
                                <div className={"w-1/2"}>
                                    <Button className={"w-full bg-red-700 font-semibold"}  onPress={handleRejectRequest}>
                                        Cancel Request
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </ModalContent>
        </Modal>
            <Box
                sx={{
                    height: '100vh', // Full viewport height
                    width: 'full',  // Full viewport width
                    display: 'flex', // Use flexbox for centering
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                }}
            >
                <Box sx={{ height: '100%', width: '80%'}}>
                    <DataGrid


                        sx={{
                            borderColor:'transparent',
                            background: 'linear-gradient(320deg,#18181b, #030712,#27272a )',
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
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                        rowHeight={190}
                        rows={rows}
                        columns={columns}
                        disableRowSelectionOnClick
                        disableColumnSelector
                        hideFooter  // Hides the footer if present
                        hideHeader ={true} // Hides the header if present
                    />
                </Box>
            </Box></>

    );
}
