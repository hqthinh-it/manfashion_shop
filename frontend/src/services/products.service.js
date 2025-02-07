import axios from "axios";
import createApiClient from "../api.service";
class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            var result = await this.api.get("/");
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async getOne(id) {
        try {
            var result = await this.api.get(`/${id}`);
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }


    async create(data) {
        try {
          var result = await axios.post('/api/products', data, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })
          return result.data;
        } catch (error) {
            console.log(error);
          return null;
        }
      }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        try {
            var result = await this.api.delete(`/${id}`);
            console.log(result.data);
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export default new ProductService();

