"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
// import { saveProject } from "@/service/project.service";
import {saveTechnology} from "@/service/technology.service";
import {DeleteIcon, EditIcon} from "@/app/components/icons";

export function TechnologyAddPopup({ onSave }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [techTypeValue, setTechTypeValue] = useState("");
  const [techNameValue, setTechNameValue] = useState("");


  const clearForm = () => {
    setTechTypeValue("");
    setTechNameValue("");
  };


  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select Technology Type"]));

  const selectedValue = React.useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]

  );

  const handleSelectionChange = (keys) => {
    setSelectedKeys(new Set(keys));
    const selectedKey = Array.from(keys)[0];
    setTechTypeValue(selectedKey); // Ensure this updates techTypeValue
  };

  const onSubmit = async () => {
    const res = await saveTechnology({
      id: "",
      technologyType:selectedValue.toString(),
      technologyName:techNameValue,


    });
    console.log("selectedValue:"+selectedValue);

    onSave(res);
    clearForm();
    onClose();
  };





  return (
    <>
      <Button onPress={onOpen}>Add New Technology</Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Technology
            </ModalHeader>
            <ModalBody>

              <Dropdown>
                <DropdownTrigger>
                  <Button
                      variant="bordered"
                      className="capitalize"
                  >
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={handleSelectionChange}
                >

                  <DropdownItem key="0">Language</DropdownItem>
                  <DropdownItem key="1">Framework</DropdownItem>
                  <DropdownItem key="2">Database</DropdownItem>

                </DropdownMenu>
              </Dropdown>

              <Textarea
                label="Technology Name"
                placeholder="Enter Technology Name"
                type="text"
                value={techNameValue}
                variant="bordered"
                onValueChange={setTechNameValue}
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
    </>
  );
}
