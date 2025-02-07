import createApiClient from "../api.service";
class OrderService {
    constructor(baseUrl = "/api/cart") {
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
        try{
          var result = await this.api.post('/', data);
          return result.data;
        } catch (error) {
            console.log(error);
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
export default new OrderService();

