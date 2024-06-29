import React from "react";
import { Table, TableColumn, TableHeader, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Checkbox } from "@nextui-org/react";
import { Category } from "@/service/category.service";

interface SelectCategoryProps {
    rows: Category[];
    columns: Column[];
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ rows, columns }) => {
    const getKeyValue = (item: Category, columnKey: string) => {
        return item[columnKey];
    };

    return (
        <>
            <h1>Select Category</h1>
            <Table aria-label="Category table">
                <TableHeader columns={columns}>
                    {(column: Column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={rows}>
                    {(item: Category) => (
                        <TableRow key={item.id}>
                            {(columnKey: string) => (
                                <TableCell>
                                    {columnKey === "categoryName" ? (
                                        <Checkbox defaultChecked>{getKeyValue(item, columnKey)}</Checkbox>
                                    ) : (
                                        getKeyValue(item, columnKey)
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default SelectCategory;
