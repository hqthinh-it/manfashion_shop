    import createApiClient from "../api.service";
    class AuthService {
        constructor(baseUrl = "/api/users") {
            this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            var result = await this.api.get("/all");
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }

    async checkUsernameExist(username) {
        try {
            var user = await this.getAll.filter(userItem => cartInfo.username == username);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async register(data) {
        try {
            var result = await this.api.post("/register", data);
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }

    async login(data) {
        try {
            var result = await this.api.post("/login", data);
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            var result = await this.api.post("/logout");
        } catch (error) {
            console.log(error);
        }
    }

    async isAdmin() {
        try {
            var result = await this.api.post("/check");
            return result.data;

        } catch (error) {
            console.log(error);
            // return null;
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


    async get() {
        try {
            var result = await this.api.get('/');
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }

    async create(data) {
        try {
            var result = await this.api.post("/", data);
            console.log(result.data);
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
export default new AuthService();

