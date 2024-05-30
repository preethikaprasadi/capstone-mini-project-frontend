"use client";

import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import {deleteProject, Project, saveProject, updateProject} from "@/service/project.service";
import {Button} from "@nextui-org/button";
import {DeleteIcon, EditIcon} from "@/app/components/icons";
import React, {useState} from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {Input, Textarea} from "@nextui-org/input";

export default function ProjectTable({rows, columns, onDelete, onEdit}) {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [titleValue, setTitleValue] = useState("");
  const [summeryValue, setSummeryValue] = useState("");
  const [project, setProject]: [Project, (project: Project) => void] = useState();


  const getKeyValue = (item, columnKey) => {
    if(columnKey === 'action'){
        return (
            <div className={'flex'}>
              <Button className={'mx-1'} isIconOnly onClick={() => handleDelete(item)}><DeleteIcon/></Button>
              <Button className={'mx-1'} isIconOnly onClick={() => handleEdit(item)}><EditIcon/></Button>
            </div>
        );
    }else {
      return item[columnKey];
    }
  }

  const handleDelete = (project: Project) => {
    deleteProject(project.id).then(
        res => {
          onDelete(project.id);
        }
    );

  }

  const handleEdit = (project: Project) => {
    setSummeryValue(project.summary);
    setTitleValue(project.title);
    setProject(project);
    onOpen();
  };

  const onSubmit = () => {
    project.title = titleValue;
    project.summary = summeryValue;
    console.log(project);

    updateProject(project).then((res) => {
      console.log(res);
      onEdit(res);
      clearForm();
      onClose();
    });
  };

  const clearForm = () => {
    setTitleValue("");
    setSummeryValue("");
  };




    return (
    <>
      <Modal
          isOpen={isOpen}
          placement="top-center"
          onClose={onClose}
          onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Project
            </ModalHeader>
            <ModalBody>
              <Input
                  label="title"
                  placeholder="Enter title"
                  type="text"
                  value={titleValue}
                  variant="bordered"
                  onValueChange={setTitleValue}
              />
              <Textarea
                  label="summery"
                  placeholder="Enter summery"
                  type="text"
                  value={summeryValue}
                  variant="bordered"
                  onValueChange={setSummeryValue}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit" onPress={onSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <Table aria-label="Project table">
        <TableHeader columns={columns}>
          {(column: Column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item: Project) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>

          )}

        </TableBody>
      </Table>
    </>
  );
}
