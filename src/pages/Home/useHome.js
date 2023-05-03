import { useCallback, useEffect, useMemo, useState } from "react";

import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setContacts(contactsList);
      setHasError(false);
    } catch (error) {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id)
      );

      handleCloseDeleteModal();
      toast({ type: "success", text: "Contato deletado com sucesso!" });
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao deletar o contato",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    contacts,
    hasError,
    filteredContacts,
    searchTerm,
    orderBy,
    contactBeingDeleted,
    isDeleteModalVisible,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleToggleOrderBy,
  };
}
