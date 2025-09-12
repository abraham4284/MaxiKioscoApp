import { useState } from "react";

export const useUtilsState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [IsOpenModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const addDataEdit = (data) => {
    setDataEdit(data);
  };

  const resetDataEdit = () => {
    setDataEdit(null);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalEdit = () => {
    setOpenModalEdit(!IsOpenModalEdit);
  };

  const closeModalEdit = () => {
    setOpenModalEdit(false);
  };

 const toggleModalAndSetDataEdit = () => {
    addDataEdit(null);
    toggleModal();
  };


  return {
    dataEdit,
    isOpen,
    IsOpenModalEdit,
    addDataEdit,
    resetDataEdit,
    toggleModal,
    closeModal,
    openModalEdit,
    closeModalEdit,
    setIsOpen,
    toggleModalAndSetDataEdit
  };
};
