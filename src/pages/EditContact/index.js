import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import ContactsService from "../../services/ContactsService";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";
import toast from "../../utils/toast";

import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  const safeAsyncAction = useSafeAsyncAction();

  const loadContact = useCallback(async () => {
    try {
      const contactData = await ContactsService.getContactById(id);

      contactFormRef.current.setFieldsValues(contactData);

      safeAsyncAction(() => {
        setIsLoading(false);
        setContactName(contactData.name);
      });
    } catch (error) {
      safeAsyncAction(() => {
        history.push("/");
        toast({ type: "danger", text: "Contato não encontrado" });
      });
    }
  }, [id, history, safeAsyncAction]);

  useEffect(() => {
    loadContact();
  }, [loadContact]);

  async function handleSubmit(contact) {
    try {
      const updatedContactData = await ContactsService.updateContact(
        id,
        contact
      );

      setContactName(updatedContactData.name);

      toast({
        type: "success",
        text: "Contato editado com sucesso!",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao editar o contato!",
      });
    }
  }

  return (
    <>
      {<Loader isLoading={isLoading} />}
      <PageHeader
        title={isLoading ? "Carregando..." : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
