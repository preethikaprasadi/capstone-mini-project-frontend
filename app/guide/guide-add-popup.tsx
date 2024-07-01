"use client";

import React, {useState} from 'react';
import {Button} from "@nextui-org/button";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {Input, Textarea} from "@nextui-org/input";
import {saveGuide} from "@/service/guide.service";

export function GuideAddPopup({ onSave}) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [profilePicValue, setProfilePicValue] = useState("");
    const [jobValue, setJobValue] = useState("");
    const [aboutValue, setAboutValue] = useState("");
    const [milestonesValue, setMilestonesValue] = useState("");
    const [socialMediaLinksValue, setSocialMediaLinksValue] = useState("");

    const onSubmit = async () => {
        const res = await saveGuide({
            id: "",
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: passwordValue,
            profilePic: profilePicValue,
            job: jobValue,
            about:aboutValue,
            milestones:milestonesValue,
            socialMediaLinks:socialMediaLinksValue,
        })
        onSave(res);
        clearForm();
        onClose();
    };

    const clearForm = () => {
        setFirstNameValue("");
        setLastNameValue("");
        setEmailValue("");
        setPasswordValue("");
        setProfilePicValue("");
        setJobValue("");
        setAboutValue("");
        setMilestonesValue("");
        setSocialMediaLinksValue("");
    };


    return (
        <>
            <Button  onPress={onOpen}>Add New Guide</Button>
            <Modal
                isOpen={isOpen}
                placement="top-center"
                onClose={onClose}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Add Guide
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                label="firstNAme"
                                placeholder="Enter firstNAme"
                                type="text"
                                value={firstNameValue}
                                variant="bordered"
                                onValueChange={setFirstNameValue}
                            />
                            <Textarea
                                label="lastName"
                                placeholder="Enter lastName"
                                type="text"
                                value={lastNameValue}
                                variant="bordered"
                                onValueChange={setLastNameValue}
                            />
                            <Textarea
                                label="email"
                                placeholder="Enter email"
                                type="text"
                                value={emailValue}
                                variant="bordered"
                                onValueChange={setEmailValue}
                            />
                            <Textarea
                                label="password"
                                placeholder="Enter password"
                                type="text"
                                value={passwordValue}
                                variant="bordered"
                                onValueChange={setPasswordValue}
                            />
                            <Textarea
                                label="profilePic"
                                placeholder="Enter profilePic"
                                type="text"
                                value={profilePicValue}
                                variant="bordered"
                                onValueChange={setProfilePicValue}
                            />
                            <Textarea
                                label="job"
                                placeholder="job"
                                type="text"
                                value={jobValue}
                                variant="bordered"
                                onValueChange={setJobValue}
                            />
                            <Textarea
                                label="about"
                                placeholder="Enter about"
                                type="text"
                                value={aboutValue}
                                variant="bordered"
                                onValueChange={setAboutValue}
                            />
                              <Textarea
                                label="milestones"
                                placeholder="Enter milestones"
                                type="text"
                                value={milestonesValue}
                                variant="bordered"
                                onValueChange={setMilestonesValue}
                            /> 
                             <Textarea
                            label="socialMediaLinks"
                            placeholder="Enter socialMediaLinks"
                            type="text"
                            value={socialMediaLinksValue}
                            variant="bordered"
                            onValueChange={setSocialMediaLinksValue}
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