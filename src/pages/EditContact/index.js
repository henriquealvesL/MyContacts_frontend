import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

export default function EditContact() {
  return (
    <>
      <PageHeader title="Editar usuário" />
      <ContactForm buttonLabel="Salvar alterações" />
    </>
  );
}
