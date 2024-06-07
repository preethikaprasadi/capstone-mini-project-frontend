import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

const CategorizeObjects = ({ data }) => {
    const [column1, setColumn1] = useState([]);
    const [column2, setColumn2] = useState([]);
    const [column3, setColumn3] = useState([]);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const column1Data = [];
        const column2Data = [];
        const column3Data = [];

        data.forEach(function (item) {
            if (item.technologyType == "0") {
                column1Data.push(item);
            } else if (item.technologyType == "1") {
                column2Data.push(item);
            } else if (item.technologyType == "2") {
                column3Data.push(item);
            }
        });

        setColumn1(column1Data);
        setColumn2(column2Data);
        setColumn3(column3Data);
    }, [data]);

    console.log("col1:", column1);
    console.log("col2:", column2);
    console.log("col3:", column3);

    const cellStyles = {
        verticalAlign: "top",
    };

    const maxRows = Math.max(column1.length, column2.length, column3.length);

    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>LANGUAGE</TableColumn>
                <TableColumn>FRAMEWORKS</TableColumn>
                <TableColumn>DATABASES</TableColumn>
            </TableHeader>
            <TableBody>
                {[...Array(maxRows)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                        <TableCell css={cellStyles}>
                            {column1[rowIndex] && (
                                <Checkbox value={column1[rowIndex].technologyName}>
                                    {column1[rowIndex].technologyName}
                                </Checkbox>
                            )}
                        </TableCell>
                        <TableCell css={cellStyles}>
                            {column2[rowIndex] && (
                                <Checkbox value={column2[rowIndex].technologyName}>
                                    {column2[rowIndex].technologyName}
                                </Checkbox>
                            )}
                        </TableCell>
                        <TableCell css={cellStyles}>
                            {column3[rowIndex] && (
                                <Checkbox value={column3[rowIndex].technologyName}>
                                    {column3[rowIndex].technologyName}
                                </Checkbox>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CategorizeObjects;
