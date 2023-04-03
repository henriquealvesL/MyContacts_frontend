import HttpClient from "./utils/HttpClient";

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }

  listContacts(orderBy = "asc") {
    return this.httpClient.get(`/categories`);
  }
}

export default new CategoriesService();
