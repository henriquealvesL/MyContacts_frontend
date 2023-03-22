import { Link } from "react-router-dom";

import Modal from "../../components/Modal";

import {
  Container,
  Header,
  ListContainer,
  Card,
  InputSearchContaier,
} from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import Loader from "../../components/Loader";

export default function Home() {
  return (
    <Container>
      {/* <Modal danger /> */}
      {/* <Loader /> */}
      <InputSearchContaier>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContaier>
      <Header>
        <strong>3 Contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>
      <ListContainer>
        <header>
          <button type="button" className="sort-button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Nome</strong>
              <small>Categoria</small>
            </div>
            <span>E-mail</span>
            <span>Telefone</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit}></img>
            </Link>
            <button type="button">
              <img src={trash}></img>
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
