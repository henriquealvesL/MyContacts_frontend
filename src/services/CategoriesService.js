/* eslint-disable import/no-anonymous-default-export */
import CategoryMapper from "./mappers/CategoryMapper";
import HttpClient from "./utils/HttpClient";

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_API_URL);
  }

  async listCategories(signal) {
    const categories = await this.httpClient.get("/categories", { signal });

    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();
