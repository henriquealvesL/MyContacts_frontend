import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  const loadContact = useCallback(async () => {
    try {
      const contactData = await ContactsService.getContactById(id);

      contactFormRef.current.setFieldsValues(contactData);

      setIsLoading(false);
      setContactName(contactData.name);
    } catch (error) {
      console.log(error);
      history.push("/");
      toast({ type: "danger", text: "Contato não encontrado" });
    }
  }, [id, history]);

  useEffect(() => {
    loadContact();
  }, [loadContact]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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
