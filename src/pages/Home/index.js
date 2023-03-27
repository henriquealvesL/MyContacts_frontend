import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import ContactsService from "../../services/ContactsService";

import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContaier,
} from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);

        setContacts(contactsList);
      } catch (error) {
        console.log("Erro: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      {/* <Modal danger /> */}
      <Loader isLoading={isLoading} />
      <InputSearchContaier>
        <input
          type="text"
          placeholder="Pesquisar contato"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContaier>
      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? " contato" : " contatos"}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

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
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit}></img>
            </Link>
            <button type="button">
              <img src={trash}></img>
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
