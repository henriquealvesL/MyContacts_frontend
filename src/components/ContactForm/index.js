import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesService";

import { ButtonContainer, Form } from "./styles";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import FormGroup from "../FormGroup";

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const { setError, removeError, getErrorMessageByFieldName, errors } =
    useErrors();

  const isFormValid = name && errors.length === 0;

  const loadCategories = useCallback(async () => {
    try {
      const categoriesList = await CategoriesService.listCategories();
      setCategories(categoriesList);
    } catch {
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: "name", message: "O campo nome é obrigatório" });
    } else {
      removeError("name");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: "email", message: "E-mail inválido" });
    } else {
      removeError("email");
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName("name")}>
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName("name")}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName("email")}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName("email")}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="16"
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
