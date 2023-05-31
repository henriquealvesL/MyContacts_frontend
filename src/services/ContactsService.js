/* eslint-disable import/no-anonymous-default-export */
import ContactMapper from "./mappers/ContactMapper";
import HttpClient from "./utils/HttpClient";

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }

  async listContacts(orderBy = "asc", signal) {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`, {
      signal,
    });

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.httpClient.get(`/contacts/${id}`, { signal });

    return ContactMapper.toDomain(contact);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.post("/contacts", { body: body });
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.put(`/contacts/${id}`, { body: body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
