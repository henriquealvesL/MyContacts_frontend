import { Link } from "react-router-dom";

import formatPhone from "../../utils/formatPhone";

import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import useHome from "./useHome";

import {
  Card,
  Container,
  EmptyListContainer,
  ErrorContainer,
  Header,
  InputSearchContaier,
  ListHeader,
  SearchNotFoundContainer,
} from "./styles";

import emptyBox from "../../assets/images/empty-box.svg";
import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import magnifierQuestion from "../../assets/images/magnifier-question.svg";
import sad from "../../assets/images/sad.svg";
import Button from "../../components/Button";

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
  return (
    <Container>
      <Loader isLoading={isLoading} />
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
      {contacts.length > 0 && (
        <InputSearchContaier>
          <input
            type="text"
            placeholder="Pesquisar contato"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContaier>
      )}
      <Header
        justifyContent={
          hasError
            ? "flex-end"
            : contacts.length > 0
            ? "space-between"
            : "center"
        }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? " contato" : " contatos"}
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao buscar seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tente novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="empty box" />
              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão
                <strong> ”Novo contato”</strong> à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />
              <span>
                Nenhum resultado foi encontrado para{" "}
                <strong>"{searchTerm}".</strong>
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
            <ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{formatPhone(contact.phone)}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="edit"></img>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt="trash"></img>
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
