import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import useHome from "./useHome";

import { Container } from "./styles";

import InputSearch from "./components/InputSearch";
import Header from "./components/Header";
import ErrorStatus from "./components/ErrorStatus";
import EmptyList from "./components/EmptyList";
import SearchNotFound from "./components/SearchNotFound";
import ContactsList from "./components/ContactsList";

export default function Home() {
  const {
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
  } = useHome();

  const hasContacts = contacts.length > 0;
  const hasFilteredContacts = filteredContacts.length > 0;
  const isListEmpy = !hasError && !hasContacts && !isLoading;
  const isSearchEmpty = !hasError && hasContacts && !hasFilteredContacts;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpy && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            isModalVisible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}?"`}
            confirmLabel="Deletar"
            isLoading={isLoadingDelete}
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
