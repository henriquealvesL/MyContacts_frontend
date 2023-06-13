import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const safeAsyncAction = useSafeAsyncAction();

  const loadContact = useCallback(
    async (signal) => {
      try {
        const contactData = await ContactsService.getContactById(id, signal);

        contactFormRef.current.setFieldsValues(contactData);

        safeAsyncAction(() => {
          setIsLoading(false);
          setContactName(contactData.name);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        safeAsyncAction(() => {
          navigate("/", { replace: true });
          toast({ type: "danger", text: "Contato não encontrado" });
        });
      }
    },
    [id, navigate, safeAsyncAction]
  );

  useEffect(() => {
    const controller = new AbortController();

    loadContact(controller.signal);

    return () => {
      controller.abort();
    };
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

  return { isLoading, contactName, contactFormRef, handleSubmit };
}
