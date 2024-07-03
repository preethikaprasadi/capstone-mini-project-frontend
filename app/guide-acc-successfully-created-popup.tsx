// import {Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/modal";
// import { CgAdd } from "react-icons/cg";
// import {Button, Link} from "@nextui-org/react";
// import React from "react";
// import {useRouter} from "next/navigation";
//
// export default function NewGuideAccCreatedPopup({isOpen, onClose}){
//     const router = useRouter();
//     const routeGuideHomePage = () => {
//         router.push("/guide");
//     };
//
//
// return(
//     <>
//         <Modal className={"p-0 m-0 max-w-3xl h-max"}  isOpen={isOpen} onClose={onClose}>
//
//             <ModalContent  className={" fixed-size pt-0"} >
//
//                 {(onClose) => (
//                     <>
//
//
//                         <div className={" flex flex-col"}>
//                             <div>
//                                 <ModalBody className={"h-full p-0 m-0 "} >
//                                     <div className={"flex flex-row gap-3 "}>
//                                         <div className="container basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800">
//                                             <p>Your Projects Success Starts from here</p>
//                                             <ul className="check-list">
//                                                 <li>Choose your guide according to your personal needs...</li>
//                                                 <li>available over 1000 guides..</li>
//                                             </ul>
//                                         </div>
//
//                                         <div className={"basis-3/5"}>
//                                             <div className="w-full flex flex-col  gap-2 justify-center pt-10 pb-5 pl-10 pr-10  ">
//                                                 <p className={"pb-10"}> Congratulations!! You are successfully created your account.. </p>
//                                                 <Button onPress={routeGuideHomePage} radius="full" className="bg-gradient-to-t from-blue-500 via-blue-700 to-blue-800 text-white shadow-lg text-xl font-semibold p-8" endContent={<CgAdd className={"font-bold text-2xl "}/>}>
//                                                     Go to the Profile
//                                                 </Button>
//
//                                             </div>
//                                             <div className={"w-full flex items-center justify-center flex-col gap-4"}>
//
//
//                                             </div>
//                                             <div className={"flex flex-row justify-end p-10 pb-5"}>
//                                                 <div >
//                                                     <Button color="danger" variant="light" onPress={onClose}>
//                                                         Close
//                                                     </Button>
//                                                 </div>
//                                                 <div>
//                                                     {/*<Button*/}
//
//                                                     {/*    color="primary"  type="submit" onPress={onSubmit}>*/}
//
//                                                     {/*    Create Account*/}
//                                                     {/*</Button>*/}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </ModalBody>
//                             </div>
//
//                         </div>
//                     </>
//                 )}
//             </ModalContent>
//         </Modal>
//
//     </>
// )
//
// }
